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
    private async genTkn() { // make User Token (BE -> FE)
        const fgen = crypto.randomUUID();
        const vTkn = await tokenSchema.findOne({
            token: fgen
        });
        return (!vTkn) ? fgen : this.genTkn()
    }

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

    async registerUser(user: Auth) {
        const newId = await this.logIn();
        await new authSchema({
            slogId: newId,
            providerData: {
                provider: user.providerData.provider,
                email: user.providerData.email,
                name: user.providerData.name,
                uid: user.providerData.uid
            },
            profilePhoto: user.profilePhoto,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }).save().then(() => {
            return newId;
        }).catch((e) => {
            console.error(e);
            return 1;
        })
    }

    async updateUser(slogId: Number, provider: string, uid: string, newData: Auth) { // PATCH Method Req
        const user = await authSchema.findOneAndUpdate({
            slogId: slogId,
            providerData: {
                provider: provider,
                uid: uid
            }
        }, newData);
        
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
    