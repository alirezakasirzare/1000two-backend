import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
  VerifyCallback,
} from "passport-jwt";

import { prisma } from "./db";

const jwtOptions: StrategyOptionsWithoutRequest = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
