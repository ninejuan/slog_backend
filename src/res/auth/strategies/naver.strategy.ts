import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-naver-v2';
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
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor() {
        super({
            clientID: env.NAVER_CLIENT_ID,
            clientSecret: env.NAVER_CLIENT_SECRET,
            callbackURL: `https://${env.DOMAIN}${env.NAVER_REDIRECT_PARAM}`,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
        const user = await authSchema.findOne({
            providerData: {
                provider: 'naver',
                email: profile.email,
            }
        });
        try {
            if (user) {
                await tokenSchema.findOneAndDelete({
                    slogId: user.slogId
                });
                if (user.providerData.name !== profile.nickname || user.profilePhoto !== profile.profile_image) {
                    user.providerData.name = profile.nickname;
                    user.profilePhoto = profile.profile_image;
                    await user.save();
                }
            } else {
                let slogId = await genIdUtil();
                const newAcc: Auth = {
                    /**
                     * 네이버는 uid 따위는 주지 않음.
                     * 어떻게 해야 할 것인가.
                     * 걍 uid는 상남자답게 패스한다.
                     */
                    slogId: slogId,
                    slogNick: profile.nickname,
                    providerData: {
                        provider: 'naver',
                        email: profile.email,
                        name: profile.name,
                        uid: profile.id
                    },
                    profilePhoto: profile.profile_photo,
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
                    provider: 'naver',
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