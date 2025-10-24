import authRouter from './authRouter';
import userRouter from './userRouter';

function route(app){
    app.use('/users/', userRouter);
    app.use('/auth/', authRouter);
}

export default route;