import Image from "next/image";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export async function getStaticProps() {
  let response = await fetch(
    "https://random-data-api.com/api/users/random_user?size=20"
  ).then((res) => res.json());

  const data = {
    response: response,
  };

  return { props: { data } };
}

const menuHome = [
  {
    name: "Home",
  },

  {
    name: "Contact",
    menu2: [
      {
        name: "Contract list",
      },

      {
        name: "Create new contract",
      },
      {
        name: "Approve contract",
      },
      {
        name: "Approve user",
      },

      {
        name: "Unblock contract",
      },

      {
        name: "Unblock user",
      },

      {
        name: "Reset pin/ password",
      },
    ],
  },

  {
    name: "Fee management",
    menu2: [
      {
        name: "Set fee",
      },
      {
        name: "Transaction fee",
        menu3: [
          {
            name: "Product fee",
          },

          {
            name: "Contract fee",
          },

          {
            name: "OTC fee",
          },
        ],
      },
    ],
  },

  {
    name: "Limit management",
    menu2: [
      {
        name: "Set fee share",
      },
      {
        name: "Product limit",
      },
      {
        name: "Contract limit",
      },
      {
        name: "Wallet balance limit",
      },
    ],
  },

  {
    name: "Transaction",
    menu2: [
      {
        name: "Transaction history",
      },
      {
        name: "Top Up to E-wallet",
      },
      {
        name: "Withdrawal from E-wallet",
      },
      {
        name: "Cash back ",
      },

      {
        name: "Payroll  ",
      },

      {
        name: "Admin transaction ",
      },

      {
        name: "Reversal transaction",
      },
    ],
  },

  {
    name: "System",
    menu2: [
      {
        name: "Group management",
      },
      {
        name: "User management",
      },
      {
        name: "System parameter",
      },
    ],
  },

  {
    name: "Report",
    menu2: [
      {
        name: "Report list",
      },
    ],
  },
];

export default function Home() {
  const [listItem, setListItem] = useState([]);
  const [status, setStatus] = useState("");
  const [reload, setReload] = useState(false);
  const [gender, setGender] = useState([]);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          `https://random-data-api.com/api/users/random_user?size=20`
        );
        let data = await response.json();
        setListItem(data);
        setStatus([...new Set(data.map((user) => user.subscription.status))]);
        setGender([...new Set(data.map((user) => user.gender))]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [reload]);

  const [itemsPerPage, setItemPerPage] = useState(5);
  const [openMenu2, setOpenMenu2] = useState(null);
  const [openMenu3, setOpenMenu3] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const display = listItem && listItem.slice(firstItem, lastItem);
  const totalPage = Math.ceil(listItem.length / itemsPerPage);

  function page() {
    let result = [];
    for (let i = 0; i < totalPage; i++) {
      result.push(
        <div
          className={`hover:bg-[#e0f3ff] w-10 h-10 text-center leading-10 rounded cursor-pointer duration-300 ${
            i + 1 === currentPage ? "text-[#3f6ad8] bg-[#e0f3ff] font-bold" : ""
          }`}
          key={i}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </div>
      );
    }

    return result;
  }

  const choose = (e) => {
    setItemPerPage(e.target.value);
    setCurrentPage(1);
  };

  const prev = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const lastPrev = () => {
    setCurrentPage(1);
  };

  const next = () => {
    if (currentPage === totalPage) {
      setCurrentPage(totalPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const lastNext = () => {
    setCurrentPage(totalPage);
  };

  function detailProduct(id) {
    let detail = listItem.filter((item, index) => item.id == id);
    return setDetail(detail);
  }

  return (
    <>
      <Header />
      <main>
        <div className="xl:mt-2 flex gap-5 mt-[78px]">
          <div className="xl:block hidden w-[20%] px-6 py-5 text-[#343a40] text-sm bg-white  top-0 left-0 sticky flex-shrink-0">
            {menuHome.map((item, index) => {
              return (
                <div key={item.name}>
                  <div
                    onClick={() =>
                      setOpenMenu2(openMenu2 === item.name ? null : item.name)
                    }
                    className={`hover:bg-[#e0f3ff] flex justify-between items-center duration-300 cursor-pointer h-[38px] leading-[38px] rounded-lg px-3 ${
                      openMenu2 === item.name
                        ? "text-[#3f6ad8] bg-[#e0f3ff] font-bold"
                        : ""
                    } `}
                  >
                    <p>{item.name}</p>
                    {item.menu2 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    )}
                  </div>

                  {item.menu2 && (
                    <div
                      className={`submenu ${
                        openMenu2 === item.name ? "open py-2" : ""
                      }`}
                    >
                      {item.menu2.map((item, index) => {
                        return (
                          <div
                            style={{
                              paddingBottom:
                                openMenu3 === item.name && item.menu3
                                  ? `${32 * (item.menu3.length + 1) + 8}px`
                                  : "",
                            }}
                            className={`  submenu-item pl-3 border-l-[5px] border-[#e0f3ff] ml-3 h-8 leading-8 duration-300`}
                            key={index}
                          >
                            <div
                              className={`hover:bg-[#e0f3ff] px-3 rounded-lg flex  justify-between items-center  cursor-pointer ${
                                openMenu3 === item.name
                                  ? "font-bold text-[#3f6ad8] bg-[#e0f3ff]"
                                  : ""
                              }`}
                              onClick={() =>
                                setOpenMenu3(
                                  openMenu3 === item.name ? null : item.name
                                )
                              }
                            >
                              <p>{item.name}</p>

                              {item.menu3 && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-chevron-down"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                  />
                                </svg>
                              )}
                            </div>

                            {item.menu3 && openMenu3 === item.name ? (
                              <div>
                                <div
                                  className={`submenu py-2  ${
                                    openMenu3 === item.name ? "open" : ""
                                  }`}
                                >
                                  {item.menu3.map((item, index) => {
                                    return (
                                      <div className="pl-3   border-l-[5px] border-[#e0f3ff] ml-3 cursor-pointer  ">
                                        <p className="px-3 hover:bg-[#e0f3ff] rounded-lg">
                                          {item.name}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full">
            <div className="bg-white mb-2 p-5">
              <p className="text-2xl font-medium text-[#3f6ad8] pb-3">
                Payroll services in bank{" "}
              </p>
              <div className="xl:flex gap-[200px] mt-5">
                <div>
                  <div className="flex items-center mb-2">
                    <p className="w-[150px]">User Name</p>
                    <input
                      type="text"
                      name=""
                      className="border border-[#ccc] rounded outline-none px-3 py-1 text-sm w-[200px]"
                    />
                  </div>

                  <div className="flex items-center mb-2">
                    <p className="w-[150px]">Status</p>
                    <select className="w-[200px] rounded-md px-3 py-1 border-[#ccc] border outline-none text-sm">
                      {status &&
                        status.map((item, index) => {
                          return <option value="">{item}</option>;
                        })}
                    </select>
                  </div>

                  <div className="flex items-center">
                    <p className="w-[150px]">Phone Number</p>
                    <input
                      type="text"
                      name=""
                      className="border border-[#ccc] rounded outline-none px-3 py-1 text-sm w-[200px]"
                    />
                  </div>
                </div>

                <div className="flex xl:mt-0 mt-2">
                  <div>
                    <div className="flex items-center mb-2">
                      <p className="w-[150px]">Gender</p>
                      <select className="w-[200px] rounded-md px-3 py-1 border-[#ccc] border outline-none text-sm">
                        {gender &&
                          gender.map((item, index) => {
                            return <option value="">{item}</option>;
                          })}
                      </select>
                    </div>

                    <div className="flex items-center mb-2">
                      <p className="w-[150px]">Email</p>
                      <input
                        type="email"
                        name=""
                        className="border border-[#ccc] rounded outline-none px-3 py-1 text-sm w-[200px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <label
                  for="file-input"
                  class="file-button duration-300 rounded hover:bg-[#f] hover:text-[#3f6ad8] hover:bg-[#e0f3ff]"
                >
                  Upload file
                  <input id="file-input" type="file" />
                </label>

                <div
                  onClick={() => setReload(!reload)}
                  class="file-button duration-300 rounded  hover:text-[#3f6ad8] hover:bg-[#e0f3ff]"
                >
                  Reload data
                </div>

                <div class="file-button duration-300 rounded  hover:text-[#3f6ad8] hover:bg-[#e0f3ff]">
                  Search
                </div>
              </div>
            </div>
            <div className=" bg-white">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="border-r">Id</TableCell>
                      <TableCell className="border-r">User Name</TableCell>
                      <TableCell className="border-r">Email</TableCell>
                      <TableCell className="border-r">Phone Number</TableCell>
                      <TableCell className="border-r">Gender</TableCell>
                      <TableCell className="border-r">Status</TableCell>
                      <TableCell align="center">Detail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {display.length > 0 &&
                      display.map((row) => (
                        <TableRow
                          className="h-[72px]"
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className="border-r"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell className="flex items-center gap-1 border-r whitespace-nowrap">
                            <div className="w-10 h-10 flex-shrink-0">
                              <img
                                src={row.avatar}
                                className="w-full h-full"
                                alt="anh"
                              />
                            </div>
                            {row.first_name} {row.last_name}
                          </TableCell>
                          <TableCell className="border-r">
                            {row.email}
                          </TableCell>
                          <TableCell className="border-r whitespace-nowrap  ">
                            {row.phone_number}
                          </TableCell>
                          <TableCell className="border-r">
                            {row.gender}
                          </TableCell>
                          <TableCell className="border-r">
                            {row.subscription.status}
                          </TableCell>
                          <TableCell className="">
                            <div
                              onClick={() => detailProduct(row.id)}
                              className="hover:bg-[#e0f3ff]  xl:translate-x-2 translate-x-0 cursor-pointer flex justify-center items-center h-10 rounded w-10"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-eye"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                              </svg>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className=" xl:flex mt-5 justify-between bg-white px-3 py-4 items-center">
              <div className="xl:flex items-center gap-5 xl:mb-0 mb-4 ">
                <div className="flex items-center gap-2 xl:mb-0 mb-2">
                  <p>Page size</p>
                  <select
                    className="border rounded outline-none border-[#333] min-w-[100px] px-3 py-1"
                    onChange={(e) => choose(e)}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>

                <p>
                  Displaying : {currentPage * itemsPerPage - itemsPerPage + 1} -{" "}
                  {currentPage * itemsPerPage >= listItem.length
                    ? listItem.length
                    : currentPage * itemsPerPage}{" "}
                  of {listItem.length}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`${
                    currentPage != 1 ? "cursor-pointer hover:bg-[#e0f3ff]" : ""
                  } w-10 h-10 flex justify-center items-center rounded`}
                  onClick={() => lastPrev()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-double-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </div>
                <div
                  onClick={() => prev()}
                  className={`${
                    currentPage != 1 ? "cursor-pointer hover:bg-[#e0f3ff]" : ""
                  } w-10 h-10 flex justify-center items-center rounded`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </div>
                <div className="flex gap-2">{page()}</div>
                <div
                  onClick={() => next()}
                  className={`${
                    currentPage != totalPage
                      ? "cursor-pointer hover:bg-[#e0f3ff]"
                      : ""
                  } w-10 h-10 flex justify-center items-center rounded`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
                <div
                  onClick={() => lastNext()}
                  className={`${
                    currentPage != totalPage
                      ? "cursor-pointer hover:bg-[#e0f3ff]"
                      : ""
                  } w-10 h-10 flex justify-center items-center rounded`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-double-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10">
          <Swiper
            className="mySwiper z-0"
            loop={true}
            navigation={true}
            modules={[Navigation, Pagination, Autoplay]}
            pagination={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide className="z-0">
              <img
                src="/banner1.jpg"
                alt="anh"
                className="xl:h-[500px] h-[300px] w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="z-0">
              <img
                src="/banner2.jpg"
                alt="anh"
                className="xl:h-[500px] h-[300px] w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="z-0">
              <img
                src="/banner3.jpg"
                alt="anh"
                className="xl:h-[500px] h-[300px] w-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="z-0">
              <img
                src="/banner4.jpg"
                alt="anh"
                className="xl:h-[500px] h-[300px] w-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </main>

      {detail.length > 0 ? (
        <section className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 flex justify-center items-center z-[10]">
          <div className="xl:w-[500px] w-[95%] bg-white xl:max-h-[70vh] h-[95vh] overflow-auto px-5 py-3 rounded-md">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold text-[#3f6ad8]">
                User information
              </h2>
              <p
                className="cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[#e0f3ff] rounded duration-300"
                onClick={() => setDetail([])}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </p>
            </div>

            <div className="text-sm">
              <div className="flex justify-center gap-5 mb-3">
                <div>
                  <p className="mb-1">First Name</p>
                  <div>
                    <input
                      disabled
                      type="text"
                      className="border w-full px-3 py-1 outline-none rounded-md "
                      value={detail[0].first_name}
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-1">Last Name</p>
                  <div>
                    <input
                      disabled
                      type="text"
                      className="border w-full px-3 py-1 outline-none rounded-md "
                      value={detail[0].last_name}
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-1">Gender</p>
                  <div>
                    <input
                      disabled
                      type="text"
                      className="border w-full px-3 py-1 outline-none rounded-md "
                      value={detail[0].gender}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-1">Email</p>
                <div>
                  <input
                    disabled
                    type="email"
                    className="border w-full px-3 py-1 outline-none rounded-md "
                    value={detail[0].email}
                  />
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-1">User Name</p>
                <div>
                  <input
                    disabled
                    type="email"
                    className="border w-full px-3 py-1 outline-none rounded-md "
                    value={detail[0].username}
                  />
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-1">Phone Number</p>
                <div>
                  <input
                    disabled
                    type="email"
                    className="border w-full px-3 py-1 outline-none rounded-md "
                    value={detail[0].phone_number}
                  />
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-1">Address</p>
                <div>
                  <input
                    disabled
                    type="email"
                    className="border w-full px-3 py-1 outline-none rounded-md "
                    value={`${detail[0].address.street_address} - ${detail[0].address.city} - ${detail[0].address.country}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      <footer className="bg-[#3f6ad8] py-5 xl:flex block ">
        <div className="text-center text-white font-semibold text-lg xl:w-4/5 w-full">
          Create by Cao Tien Dat
        </div>

        <div className="xl:w-1/5 text-center text-white w-full">
          Version 1.1.1
        </div>
      </footer>
    </>
  );
}
