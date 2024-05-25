import { useEffect, useState } from "react";
import "../assets/css/packages.css";
import { Button } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

let defaultPackagesData = [
  {
    type: "basic",
    title: "Basic",
    price: "$300",
    features: [
      "Party planning",
      "Party styling",
      "Party catering",
      "1 hour entertainer show",
      "Face painters",
    ],
  },
  {
    type: "standard",
    title: "Standard",
    price: "$500",
    features: [
      "Party planning",
      "Party styling",
      "Party catering",
      "2 hour entertainer show",
      "Face painters",
      "Balloon modellers",
    ],
  },
  {
    type: "premium",
    title: "Premium",
    price: "$800",
    features: [
      "Party planning",
      "Party styling",
      "Party catering",
      "4 hour entertainer show",
      "5 additional fun possibilities",
    ],
  },
];

const Packages = () => {
  const user = useSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const [editedPackage, setEditedPackage] = useState(null);
  const [packagesData, setPackagesData] = useState([]);

  useEffect(() => {
    const savedPackages = JSON.parse(localStorage.getItem("packagesData"));

    if (savedPackages) {
      setPackagesData(savedPackages);
    } else {
      setPackagesData(defaultPackagesData);
    }
  }, []);

  const handleEditClick = (index) => {
    setEditMode(true);
    setEditedPackage(index);
  };

  const handleSaveClick = () => {
    //
  };

  return (
    <div className="happy-show">
      <h1>
        <span className="text-color">HappyHub</span>
      </h1>
      <p>Affordable Party Packages</p>
      <div className="pricing-table">
        {packagesData.map((pkg, index) => (
          <div key={pkg.type} className={`package ${pkg.type}`}>
            <h2 contentEditable={editMode && editedPackage === index}>
              {pkg.title}
            </h2>
            <p contentEditable={editMode && editedPackage === index}>
              {pkg.price}
            </p>
            <ul>
              {pkg.features.map((feature, featIndex) => (
                <li
                  key={featIndex}
                  contentEditable={editMode && editedPackage === index}
                >
                  {feature}
                </li>
              ))}
            </ul>
            <Button>Buy {":)"}</Button>
            {editMode && user?.role === "Admin" ? (
              <Button onClick={handleSaveClick}>Save</Button>
            ) : user?.role === "Admin" ? (
              <Button onClick={() => handleEditClick(index)}>Edit</Button>
            ) : (
              <p></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
