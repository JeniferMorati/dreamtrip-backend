import { CreateModule } from "@expressots/core";
import { UpvoteSendController } from "./send/upvote-send.controller";

const UpvoteModule = CreateModule([UpvoteSendController]);

export { UpvoteModule };
