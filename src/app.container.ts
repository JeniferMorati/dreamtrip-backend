import { AppContainer } from "@expressots/core";
import { UserModule } from "@useCases/user/user.module";
import { TravelModule } from "@useCases/travel/travel.module";
import { TipModule } from "@useCases/tip/tip.module";
import { UpvoteModule } from "@useCases/upvote/upvote.module";

const appContainer = new AppContainer();

const container = appContainer.create([UserModule, TravelModule, TipModule, UpvoteModule]);

export { container };
