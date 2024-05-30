import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-naver';
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
export class GoogleStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor() {
        super({
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: `https://${env.DOMAIN}${env.GOOGLE_REDIRECT_PARAM}`,
            passReqToCallback: true,
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const user = await authSchema.findOne({
            providerData: {
                email: profile.email[0].value,
                uid: profile.id
            }
        });
        try {
            if (user) {
                await tokenSchema.findOneAndDelete({
                    slogId: user.slogId
                });
                if (user.providerData.name !== profile.displayName || user.profilePhoto !== profile.photos[0].value.replace(/sz=50/gi, 'sz=250')) {
                    user.providerData.name = profile.displayName;
                    user.profilePhoto = profile.photos[0].value.replace(/sz=50/gi, 'sz=250');
                    await user.save();
                }
            } else {
                let slogId = await genIdUtil();
                const newAcc: Auth = {
                    slogId: slogId,
                    slogNick: profile.displayName,
                    providerData: {
                        provider: 'google',
                        email: profile.email[0].value,
                        name: profile.displayName,
                        uid: profile.id
                    },
                    profilePhoto: profile.photos[0].value.replace(/sz=50/gi, 'sz=250'),
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