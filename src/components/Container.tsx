/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import { createSvgIcon } from "@mui/material/utils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import ClearIcon from "@mui/icons-material/Clear";

// eslint-disable-next-line react-refresh/only-export-components
const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);
interface Campaign {
  information: {
    campaignName: string;
    description?: string;
  };
  subCampaigns: {
    name: string;
    status: boolean;
    ads: {
      name: string;
      quantity: number;
    }[];
  }[];
}

function Container() {
  const [value, setValue] = useState("1");
  const [campaignInfo, setCampaignInfo] = useState({
    campaignName: "",
    description: "",
  });
  const handleCampaignInfoChange = (event: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = event.target;
    setCampaignInfo({
      ...campaignInfo,
      [name]: value,
    });
  };

  const [focusedCard, setFocusedCard] = useState(0);
  const [cards, setCards] = useState([
    {
      name: "Chiến dịch con 1",
      status: true,
      cardItems: [{ name: "Quảng cáo 1", quantity: 0 }],
    },
  ]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<boolean[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [isValidCardName, setIsValidCardName] = useState(true);
  const [isValidCardItemName, setIsValidCardItemName] = useState<boolean[]>([]);
  const [isValidCardItemQuantity, setIsValidCardItemQuantity] = useState<
    boolean[]
  >([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (
    _event: any,
    newValue: React.SetStateAction<string>
  ) => {
    setValue(newValue);
  };

  const handleAddCampaign = () => {
    const newCampaign = {
      name: "Chiến dịch con 1",
      status: true,
      cardItems: [{ name: "Quảng cáo 1", quantity: 0 }],
    };
    setCards([...cards, newCampaign]);
  };

  const handleCardFocus = (index: React.SetStateAction<number>) => {
    setFocusedCard(index);
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, status: !card.status } : card
      )
    );
  };

  const handleAddCard = () => {
    const newCard = {
      name: `Chiến dịch con ${cards.length + 1}`,
      status: true,
      count: 0,
      cardItems: [{ name: "Quảng cáo 1", quantity: 0 }],
    };
    setCards([...cards, newCard]);
    setFocusedCard(cards.length);
  };

  const handleAddCardItem = () => {
    const updatedCards = [...cards];
    updatedCards[focusedCard].cardItems.push({
      name: `Quảng cáo ${updatedCards[focusedCard].cardItems.length + 1}`,
      quantity: 0,
    });
    setCards(updatedCards);
  };

  const handleCardItemChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const updatedCards = [...cards];
    (updatedCards[focusedCard].cardItems[index] as any)[name] = value;
    setCards(updatedCards);
    const updatedItemsValidity = updatedCards[focusedCard].cardItems.map(
      (item) => parseInt(item.quantity.toString()) !== 0
    );
    setIsValidCardItemQuantity(updatedItemsValidity);
  };

  const shouldShowQuantityError = !isValidCardItemQuantity.every(
    (validity) => validity
  );

  const handleDeleteCardItem = (itemIndex: number) => {
    const updatedCards = [...cards];
    updatedCards[focusedCard].cardItems.splice(itemIndex, 1);
    setCards(updatedCards);
    calculateTotalQuantity();
  };

  const handleCheckboxChange = (itemIndex: number) => {
    const newSelectedCheckboxes: boolean[] = [...selectedCheckboxes];
    newSelectedCheckboxes[itemIndex] = !newSelectedCheckboxes[itemIndex];
    setSelectedCheckboxes(newSelectedCheckboxes);

    const allSelected: boolean = newSelectedCheckboxes.every(
      (checkbox) => checkbox
    );
    setSelectAllChecked(allSelected);
  };

  const handleCheckboxChangeConfirm = (event: { target: { checked: any } }) => {
    const isChecked = event.target.checked;
    const updatedCards = [...cards];
    updatedCards[focusedCard].status = isChecked;
    setCards(updatedCards);
  };

  const handleSelectAllCheckboxChange = (event: {
    target: { checked: any };
  }) => {
    const isChecked = event.target.checked;
    setSelectAllChecked(isChecked);

    const newSelectedCheckboxes = cards[focusedCard].cardItems.map(
      () => isChecked
    );
    setSelectedCheckboxes(newSelectedCheckboxes);
  };

  const anyCheckboxSelected = selectedCheckboxes.some((checkbox) => checkbox);

  const handleDeleteSelectedItems = () => {
    const updatedCards = [...cards];
    updatedCards[focusedCard].cardItems = updatedCards[
      focusedCard
    ].cardItems.filter((_, index) => !selectedCheckboxes[index]);
    setCards(updatedCards);
    setSelectedCheckboxes([]);
    setSelectAllChecked(false);
    calculateTotalQuantity();
  };

  const deleteCard = (index: number) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1); // Loại bỏ card khỏi danh sách cards
    setCards(updatedCards);
    // Đặt focus cho card tiếp theo, nếu không còn card tiếp theo thì đặt focus cho card trước đó
    const nextFocusedCardIndex = index === 0 ? 0 : index - 1;
    setFocusedCard(nextFocusedCardIndex);
  };
  const calculateTotalQuantity = () => {
    return cards.map((card) => {
      return card.cardItems.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.quantity.toString()),
        0
      );
    });
  };

  const [isValid, setIsValid] = useState({
    campaignName: true,
    description: true,
  });

  const handleSubmit = (campaign: Campaign) => {
    setIsSubmitted(true);
    const hasEmptyCampaignName = !campaign.information.campaignName;
    const hasDescription = !!campaign.information.description;
    const hasEmptyCardName = !cards[focusedCard].name;
    const hasEmptyCardItemNames = cards[focusedCard].cardItems.some(
      (item) => !item.name
    );
    const hasEmptyCardItemQuantities = cards[focusedCard].cardItems.some(
      (item) => parseInt(item.quantity.toString()) === 0
    );

    if (
      hasEmptyCampaignName ||
      hasEmptyCardName ||
      hasEmptyCardItemNames ||
      hasEmptyCardItemQuantities
    ) {
      setIsValid({
        campaignName: !hasEmptyCampaignName,
        description: true,
      });
      setIsValidCardName(!hasEmptyCardName);
      const updatedCardItemNamesValid = cards[focusedCard].cardItems.map(
        (item) => !!item.name
      );
      setIsValidCardItemName(updatedCardItemNamesValid);
      const updatedCardItemQuantitiesValid = cards[focusedCard].cardItems.map(
        (item) => parseInt(item.quantity.toString()) !== 0
      );
      setIsValidCardItemQuantity(updatedCardItemQuantitiesValid);

      alert("Vui lòng nhập đầy đủ giá trị");
      return;
    }
    const campaignData = {
      information: {
        campaignName: campaign.information.campaignName,
        description: hasDescription ? campaign.information.description : " ",
      },
      subCampaigns: campaign.subCampaigns.map((subCampaign) => ({
        name: subCampaign.name,
        status: subCampaign.status ? "true" : "false",
        ads: subCampaign.ads.map((ad) => ({
          name: ad.name,
          quantity: ad.quantity,
        })),
      })),
    };

    alert(JSON.stringify(campaignData));
  };

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }

  return (
    <div className="wrapper">
      <div>
        <div className="text-right p-6">
          {cards.length === 0 ? (
            <Button variant="contained" onClick={handleAddCampaign}>
              Thêm chiến dịch
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                handleSubmit({
                  information: campaignInfo,
                  subCampaigns: cards.map((card) => ({
                    name: card.name,
                    status: card.status,
                    ads: card.cardItems,
                  })),
                })
              }
            >
              Submit
            </Button>
          )}
        </div>
        <div className="w-full border-b border-gray-500"></div>
      </div>

      <div className="pt-5 pl-5">
        <Box
          sx={{
            width: "100%",
            maxWidth: 1880,
            typography: "body1",
            border: "1px solid grey",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={<Typography fontWeight="bold">Thông tin</Typography>}
                  value="1"
                />
                <Tab
                  label={
                    <Typography fontWeight="bold">Chiến dịch con</Typography>
                  }
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <TextField
                  fullWidth
                  id="Tên chiến dịch *"
                  label="Tên chiến dịch *"
                  variant="standard"
                  name="campaignName"
                  value={campaignInfo.campaignName}
                  onChange={handleCampaignInfoChange}
                  error={
                    !isValid.campaignName && campaignInfo.campaignName === ""
                  }
                  helperText={
                    !isValid.campaignName &&
                    campaignInfo.campaignName === "" &&
                    "Vui lòng nhập tên chiến dịch"
                  }
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  id="Mô tả"
                  label="Mô tả"
                  variant="standard"
                  name="description"
                  value={campaignInfo.description}
                  onChange={handleCampaignInfoChange}
                />
              </div>
            </TabPanel>
            <TabPanel value="2">
              {cards.length === 0 ? (
                <div className="text-center pt-5">Không có chiến dịch nào.</div>
              ) : (
                <div className=" items-center">
                  <div className="flex items-center overflow-auto pb-5">
                    <div
                      className="pr-5 cursor-pointer"
                      onClick={handleAddCard}
                    >
                      <span className="inline-block rounded-full p-1 bg-gray-200 hover:bg-gray-500">
                        <PlusIcon color="primary" />
                      </span>
                    </div>

                    {cards.map((card, index) => (
                      <div key={index} style={{ margin: "0 4px" }}>
                        <Card
                          sx={{
                            position: "relative",
                            maxWidth: 170,
                            minWidth: 170,
                            maxHeight: 120,
                            minHeight: 120,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border:
                              focusedCard === index ? "1px solid blue" : "none",
                          }}
                          tabIndex={0}
                          onFocus={() => handleCardFocus(index)}
                        >
                          <ClearIcon
                            className="cursor-pointer"
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}
                            onClick={() => deleteCard(index)}
                          />{" "}
                          <CardContent>
                            <div className="flex items-center">
                              <Typography
                                className="pr-2"
                                gutterBottom
                                component="div"
                                sx={{
                                  textAlign: "center",
                                  color: shouldShowQuantityError
                                    ? "red"
                                    : "inherit",
                                  fontSize: "14px",
                                }}
                              >
                                {truncateText(card.name, 30)}{" "}
                              </Typography>
                              <div className="w-4 h-4 rounded-full flex items-center justify-center bg-green-500">
                                <DoneIcon
                                  sx={{ fontSize: 18, color: "white" }}
                                />
                              </div>
                            </div>
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{ textAlign: "center" }}
                            >
                              {card.cardItems.reduce(
                                (totalQuantity, item) =>
                                  totalQuantity +
                                  parseInt(item.quantity.toString()),
                                0
                              )}
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center pt-4 ">
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "100ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="Tên chiến dịch con *"
                        label="Tên chiến dịch con *"
                        variant="standard"
                        value={cards[focusedCard].name}
                        onChange={(event) => {
                          const updatedCards = [...cards];
                          updatedCards[focusedCard].name = event.target.value;
                          setCards(updatedCards);
                          setIsValidCardName(!!event.target.value);
                        }}
                        error={
                          !isValidCardName && cards[focusedCard].name === ""
                        }
                        helperText={
                          !isValidCardName &&
                          cards[focusedCard].name === "" &&
                          "Vui lòng nhập tên chiến dịch con"
                        }
                      />
                    </Box>
                    <div className=" flex items-center pt-5 pl-20">
                      <Checkbox
                        {...label}
                        defaultChecked
                        onChange={handleCheckboxChangeConfirm}
                      />
                      <span className="pt-3">
                        <Typography gutterBottom component="div">
                          Đang hoạt động
                        </Typography>
                      </span>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex items-center justify-between">
                      <span className="flex">
                        <Checkbox
                          {...label}
                          checked={selectAllChecked}
                          onChange={handleSelectAllCheckboxChange}
                        />
                        {anyCheckboxSelected ? (
                          <span
                            className="mr-auto pt-2 text-gray-500"
                            onClick={handleDeleteSelectedItems}
                          >
                            <DeleteIcon />
                            <span>Xóa quảng cáo</span>
                          </span>
                        ) : (
                          <Typography
                            className="pt-2 pl-2"
                            gutterBottom
                            component="div"
                          >
                            Tên quảng cáo*
                          </Typography>
                        )}
                      </span>
                      {!anyCheckboxSelected && (
                        <span className="mr-2">
                          <Typography gutterBottom component="div">
                            Số lượng*
                          </Typography>
                        </span>
                      )}
                      <Button variant="outlined" onClick={handleAddCardItem}>
                        <PlusIcon />
                        Thêm
                      </Button>
                    </div>
                    <div className="w-full border-b border-gray-500 pt-3"></div>
                    {cards[focusedCard].cardItems.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <div
                          className={`flex items-center justify-between ${
                            selectedCheckboxes[itemIndex]
                              ? "bg-red-200"
                              : "hover:bg-gray-200"
                          } pt-2`}
                        >
                          <Checkbox
                            {...label}
                            checked={selectedCheckboxes[itemIndex] || false}
                            onChange={() => handleCheckboxChange(itemIndex)}
                          />
                          <div className="mr-auto">
                            <Box
                              component="form"
                              sx={{
                                "& > :not(style)": { m: 1, width: "90ch" },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <TextField
                                variant="standard"
                                name="name"
                                value={item.name}
                                onChange={(event) => {
                                  handleCardItemChange(event, itemIndex);
                                  const updatedItems = [...isValidCardItemName];
                                  updatedItems[itemIndex] =
                                    !!event.target.value;
                                  setIsValidCardItemName(updatedItems);
                                }}
                                error={
                                  !isValidCardItemName[itemIndex] &&
                                  item.name === ""
                                }
                                helperText={
                                  !isValidCardItemName[itemIndex] &&
                                  item.name === "" &&
                                  "Vui lòng nhập tên quảng cáo"
                                }
                              />
                            </Box>
                          </div>
                          <div className="mr-auto">
                            <Box
                              component="form"
                              sx={{
                                "& > :not(style)": { m: 1, width: "90ch" },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <TextField
                                variant="standard"
                                required
                                type="number"
                                name="quantity"
                                value={String(item.quantity)}
                                onChange={(event) => {
                                  handleCardItemChange(event, itemIndex);
                                  const updatedItems = [
                                    ...isValidCardItemQuantity,
                                  ];
                                  updatedItems[itemIndex] =
                                    parseInt(event.target.value) !== 0;
                                  setIsValidCardItemQuantity(updatedItems);
                                }}
                                error={
                                  !isValidCardItemQuantity[itemIndex] &&
                                  isSubmitted &&
                                  parseInt(item.quantity.toString()) === 0
                                } // Chỉ hiển thị validation khi đã bấm nút submit và trường không hợp lệ
                                helperText={
                                  !isValidCardItemQuantity[itemIndex] &&
                                  isSubmitted &&
                                  parseInt(item.quantity.toString()) === 0 &&
                                  "Số lượng không được bỏ trống"
                                }
                              />
                            </Box>
                          </div>
                          <span
                            className="mr-auto pt-3 text-gray-500"
                            onClick={() => handleDeleteCardItem(itemIndex)}
                          >
                            <DeleteIcon />
                          </span>
                        </div>
                        <div className="w-full border-b border-gray-400 pt-0"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
export default Container;
