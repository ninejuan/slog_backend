import mongo from 'mongoose';

// 내용 추가하기
const tokenSchema = new mongo.Schema({
    slogId: { type: Number, required: true }, // 모든 토큰은 암호화 필요. (jwt 사용?)
    providerData: {
        RefreshToken: { type: String, required: true },
        AccessToken: { type: String, required: true },
    }
    // 이대로 jwt에서 로드
});

/**
 * token expiration 관련 메모사항
 * 1. 로그인 유지 체크박스 disabled : Date.now() + 24h
 * 2. 로그인 유지 체크박스 enabled : Date.now() + 7d
 */

export default mongo.model('token', tokenSchema);