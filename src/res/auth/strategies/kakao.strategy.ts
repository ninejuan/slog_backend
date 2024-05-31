import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-kakao';
import { config } from 'dotenv';
import authSchema from 'src/models/auth.schema';
import tokenSchema from 'src/models/token.schema';
import tokenDataSchema from 'src/models/tokendata.schema';
import Auth from 'src/interface/auth.interface';
import Token from 'src/interface/token.interface';
import tokenData from 'src/interface/tokenData.interface';
import genIdUtil from 'src/utils/genId.util';
import genTknUtil from 'src/utils/genTkn.util';
config();

const env = process.env;

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({
            clientID: env.KAKAO_RESTAPI_KEY,
            clientSecret: env.KAKAO_CLIENT_SECRET,
            callbackURL: `https://${env.DOMAIN}${env.KAKAO_REDIRECT_PARAM}`,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const user = await authSchema.findOne({
            providerData: {
                provider: 'kakao',
                email: profile._json.kakao_account.email,
                uid: profile.id,
            }
        });
        try {
            if (user) {
                await tokenSchema.findOneAndDelete({
                    slogId: user.slogId
                });
                if (user.providerData.name !== profile.displayName || user.profilePhoto !== profile._json.properties.profile_image) {
                    user.providerData.name = profile.displayName;
                    user.profilePhoto = profile._json.properties.profile_image;
                    await user.save();
                }
            } else {
                let slogId = await genIdUtil();
                const newAcc: Auth = {
                    slogId: slogId,
                    slogNick: profile.displayName,
                    providerData: {
                        provider: 'kakao',
                        email: profile._json.kakao_account.email,
                        name: profile.displayName,
                        uid: profile.id
                    },
                    profilePhoto: profile._json.properties.profile_image,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                }
                await new authSchema(newAcc).save();
            }
            let Tkn = await genTknUtil();
            const newTkn: Token = {
                slogId: user.slogId,
                token: Tkn,
                providerData: {
                    provider: 'kakao',
                    refToken: refreshToken,
                    acToken: accessToken
                }
            };
            const regTkn: tokenData = {
                slogId: user.slogId,
                token: Tkn
            }
            await new tokenSchema(newTkn).save();
            await new tokenDataSchema(regTkn).save();
            done(null, regTkn);
        } catch (err) {
            done(err, false);
        }
    }
}