import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Nav_bar";
import { Puff } from "react-loader-spinner";
import Footer from "../components/Footer";
import MediaControlCard from "../components/Card";
import UserService from "../services/UserService";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const cardContent = [
  {
    eventName: "Birthday Party",
    imageSrc:
      "https://img.freepik.com/free-photo/children-celebrating-birthday_23-2148155321.jpg?t=st=1706633707~exp=1706634307~hmac=d9a09433c1f8fb80b769be5dd9cc2cd94c2688ed4c907eb991a5de7fbd06ac8b",
    description: "lorem ipsum dolor sit amet, consectetur ",
    cost: "$100",
    category: "Pool party",
    addOn: "Magic Show",
    food: "BBQ",
  },
  {
    eventName: "Pool Party",
    imageSrc:
      "https://img.freepik.com/free-photo/children-having-fun-with-floater-by-pool_23-2149492546.jpg?w=1060&t=st=1706633773~exp=1706634373~hmac=df3e79ccce0d1f4b5e3c7c90365898c35609dc4edd3c967eeffa91ecf693e6b5",
    description: "lorem ipsum dolor sit amet, consectetur ",
    cost: "$100",
    category: "Pool party",
    addOn: "Magic Show",
    food: "BBQ",
  },
  {
    eventName: "Art Party",
    imageSrc:
      "https://img.freepik.com/free-photo/children-having-fun-with-floater-by-pool_23-2149492546.jpg?w=1060&t=st=1706633773~exp=1706634373~hmac=df3e79ccce0d1f4b5e3c7c90365898c35609dc4edd3c967eeffa91ecf693e6b5",
    description: "lorem ipsum dolor sit amet, consectetur ",
    cost: "$100",
    category: "Pool party",
    addOn: "Magic Show",
    food: "BBQ",
  },
  {
    eventName: "Crafting",
    imageSrc:
      "https://img.freepik.com/free-photo/portrait-mother-her-daughter-painting-easter-eggs-with-brush-table_23-2148066322.jpg?w=1060&t=st=1706633899~exp=1706634499~hmac=5e76d502f1cf86fd726e1a66b589b244f094a145e9bb1fd719579acd6c0c758a",
    description: "lorem ipsum dolor sit amet, consectetur ",
    cost: "$100",
    category: "Pool party",
    addOn: "Magic Show",
    food: "BBQ",
  },
];

function View_schedule() {
  const user = useSelector(selectUser);
  const [event, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      UserService.GetEvents(user.email, user.token).then((res) =>
        setEvents(res.data)
      );
      console.log(cardContent);
    } catch (e) {
      console.log(e);
    }
  }, [user.email, user.token]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <Puff
          visible={true}
          height="80"
          width="80"
          color="#ac87c5"
          ariaLabel="puff-loading"
          wrapperClass="flex-center-full loader"
        />
      ) : (
        <>
          <PrimarySearchAppBar />
          {event.length !== 0 ? (
            <div className="flex-box-card">
              {event.map((event, index) => (
                <>
                  <MediaControlCard key={index} cardContent={event} />
                </>
              ))}
            </div>
          ) : (
            <center style={{ margin: "15%" }}>
              <h1>Ops! No Data found</h1>
            </center>
          )}
          <Footer />
        </>
      )}
    </>
  );
}

export default View_schedule;
