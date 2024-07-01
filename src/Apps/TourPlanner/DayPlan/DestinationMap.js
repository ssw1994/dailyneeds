import { Card, CardFooter } from "../../../Shared";
import Gmap from "../../../Shared/Gmap/Gmap";
import Tab from "../../../Shared/Tabs/Tab";
export const DestinationMap = ({ activeTab, isLastTab, uuid }) => {
  return <Card>{isLastTab && <Gmap></Gmap>}</Card>;
};

export default Tab(DestinationMap);
