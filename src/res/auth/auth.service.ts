import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import tokenSchema from 'src/models/token.schema';
import authSchema from 'src/models/auth.schema';
import Auth from 'src/interface/auth.interface';
import tokenData from 'src/interface/token.interface';
import Token from 'src/interface/token.interface';
import checkXSS from 'src/utils/checkXSS.util';

/**
 * response code
 * 0 : normal
 * 1 : error
 */

@Injectable()
export class AuthService {
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

    async changeNick(slogId: string, newNick: string) {
        const user = await authSchema.findOne({
            slogId: slogId
        });
        user.slogNick = newNick;
        await user.save();
        return slogId;
    }

    async changeDesc(slogId: Number, newDesc: String) {
        const user = await authSchema.findOne({
            slogId: slogId
        });
        user.desc = newDesc.toString();
        await user.save();
        return slogId;
    }
}
