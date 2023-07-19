import DaumPostcode from "react-daum-postcode";

type props = {
  setIsModalVisible: (data: boolean) => void;
  // action: (key: string, value: string) => void;
  action: any;
};

const ModalPostCode = ({ setIsModalVisible, action }: props) => {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zipcode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      setIsModalVisible(false);
    }

    action(zipcode, data.address);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

export default ModalPostCode;
