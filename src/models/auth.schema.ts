import mongo from 'mongoose';

const authSchema = new mongo.Schema({
    slogId: { type: Number, required: true }, // url param에 사용 (content 시청 시)
    slogNick: { type: String, required: true },
    providerData: {
        provider: { type: String, required: true }, // google, naver, kakao
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        uid: { type: String, required: true }
    },
    profilePhoto: { type: String, default: "none"}, // none인 경우 FE단에서 기본 프로필 로드
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true }
})

export default mongo.model('user', authSchema);