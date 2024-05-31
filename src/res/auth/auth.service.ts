import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import tokenSchema from 'src/models/token.schema';
import authSchema from 'src/models/auth.schema';
import Auth from 'src/interface/auth.interface';
import tokenData from 'src/interface/tokenData.interface';
import Token from 'src/interface/token.interface';

/**
 * response code
 * 0 : normal
 * 1 : error
 */

@Injectable()
export class AuthService {
        async logIn(user: Auth, token: Token) {
        // register user token (expires in 1 weeks)
        const userTkn = await this.genTkn();
        await new tokenSchema({
            slogId: user.slogId,
            token: userTkn,
            providerData: {
                acToken: token
            }
        })
    }

    async validateUser(provider: string, email: string, uid: string) {
        const user = await authSchema.findOne({
            providerData: {
                provider: provider,
                email: email,
                uid: uid
            }
        });
        return user ?? 1; // code validating 필요
    }

    async deleteUser(slogId: Number, provider: string, email: string, uid: string) { // DELETE Method
        await authSchema.deleteOne({
            slogId: slogId,
            providerData: {
                provider: provider,
                email: email,
                uid: uid
            }
        }).then(() => {
            return 0;
        }).catch((e) => {
            throw new Error(e);
        })
    }
}
    