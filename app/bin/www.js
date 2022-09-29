// app.listen() 최적화 => node ./bin/www.js로 실행(컴파일이 실행된 위치를 기반으로 각 파일들의 위치를 상대적으로 검색하게 됨)
const app = require("../app");
// const PORT = 3000;
const PORT = process.env.PORT || 3000; // .env에 환경변수 등록해뒀기때문에, process.env.PORT로 사용 가능! (환경변수가 없으면 (||3000) 으로 실행)
// const PORT = process.env.PORT ||3000;

app.listen( PORT, () => {
    console.log(`서버 가동 in ..  http://localhost:${PORT}/`);
});