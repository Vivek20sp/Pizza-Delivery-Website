import { Fragment } from "react";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import useFetauredItems from "../hook/useFetauredItems";

const Home = () => {
    TabTitle("Home - Pizza Taste");
    const { loading, itemsData } = useFetauredItems();

    return (
        <Fragment>
            <Landing />
            <FeaturedCategories />
            <FeaturedItems loading={loading} items={itemsData} />
        </Fragment>
    );
}

export default Home;