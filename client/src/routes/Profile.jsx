import MyAccount from "../../UI/Account/MyAccount/MyAccount";
import ManageAccount from "../../UI/Account/ManageAccount/ManageAccount";
import { TabTitle } from "../../../utils/General";

export const Profile = () => {

    TabTitle("My Account - Pizza Taste")

    return ( 
        <MyAccount />
     );
}

export const AccountManager = () => {

    TabTitle("My Account - Pizza Taste")

    return (
        <ManageAccount />
    );
}