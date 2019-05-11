import { createStackNavigator } from "react-navigation";
import Account from "./Account";

export default (DrawNav = createStackNavigator({
  Account: Account,
}));
