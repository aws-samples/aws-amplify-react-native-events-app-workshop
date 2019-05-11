import { createStackNavigator } from "react-navigation";
import Home from "./Home";
import Create from "./Create";
import ChatRoom from "../event/ChatRoom";
import EventDetail from "../event/EventDetail";

const DrawNav = createStackNavigator(
  {
    Home: Home,
    Create: Create,
    EventDetail: EventDetail,
    ChatRoom: ChatRoom,
  }
);

DrawNav.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
}

export default DrawNav;
