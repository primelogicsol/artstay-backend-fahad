import express from 'express';
import { env } from '~/env';
import cookieParser from 'cookie-parser';
import { morganMiddleware } from '~/middlewares/morgan.middleware';
import { mainRouter } from '~/routes/index.routes';
import cors from 'cors';
if (env.NODE_ENV === 'production') {
  require('module-alias/register');
}
//* declaration of variables 
const app = express();
const port = env.PORT || 3001;

// * middlewares
app.use(morganMiddleware);
app.use(cookieParser(env.COOKIE_SECRET));
app.use(cors({
  origin:env.ALLOWED_ORIGINS,
  credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1',mainRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});