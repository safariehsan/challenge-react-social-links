import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useFormik } from "formik";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Toast } from "./components/Toast";
import { Dialog } from "./components/Dialog";
import { Collapse } from "./components/Collapse";
import { BreadCrumb } from "./components/Breadcrumb";
import EditIcon from "@mui/icons-material/Edit";
import { Item } from "./constants";
import {
  getSocialList,
  removeSocialItem,
  updateSocialItem,
} from "./App.service";
import { addSocialItem } from "./App.service";
import { FormItem } from "./types";

const App: React.FC = () => {
  const [confirmDelete, setConfirmDelete] = useState<string>("");
  const [socialList, setSocialList] = useState<FormItem[]>([]);
  const [displayToast, setDisplayToast] = useState<boolean>(false);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [removingId, setRemovingId] = useState<number | undefined>(0);
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<FormItem>();
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  useEffect(() => {
    getSocialList()
      .then((res) => setSocialList(res.data))
      .catch((err) => console.log(err));
  }, [added]);

  useEffect(() => {}, [editingItem]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const formik = useFormik({
    initialValues: {
      socialID: "",
      socialLink: "",
      socialType: "",
    },

    onSubmit: (values, { resetForm }) => {
      const itemExists = socialList.find((item) => {
        if (item.socialType === values.socialType) {
          return true;
        }
      });
      const data = {
        socialID: values.socialID,
        socialLink: values.socialLink,
        socialType: values.socialType,
      };
      if (!itemExists) {
        addSocialItem(data)
          .then((res) => {
            setAdded(true);
            setSocialList([...JSON.parse(res.data)]);
          })
          .catch((err) => console.log(err));
      } else {
        setDisplayToast(true);
      }
      resetForm();
      setAdded(false);
    },
  });

  const handleToastClose = () => {
    setDisplayToast(false);
  };

  const handleModalOpen = (id: number | undefined) => {
    setDisplayModal(true);
    setRemovingId(id);
    setConfirmDelete("");
  };

  const handleModalClose = () => {
    setDisplayModal(false);
  };

  const handleEdit = (id: number | undefined) => {
    setEditMode(true);
    const selectedItem = socialList.find((item) => {
      return item.id === id;
    });
    setEditingItem(selectedItem);
    formik.values.socialLink = editingItem?.socialLink!;
    formik.values.socialID = editingItem?.socialID!;
    formik.values.socialType = editingItem?.socialType!;
    console.log(editingItem?.socialType);
    setOpenAccordion(true);
  };

  const handleDelete = () => {
    console.log(removingId);
    removeSocialItem(removingId)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    const socials = [...socialList];
    const newList = socials.filter((item) => {
      return item.id !== removingId;
    });
    setDisplayModal(false);
    setSocialList(newList);
  };

  const handleAccordionClick = () => {
    const accordionStatus = openAccordion;
    setOpenAccordion(!accordionStatus);
  };

  const handleAccordionClose = () => {
    setOpenAccordion(false);
    setEditMode(false);
    formik.values.socialLink = "";
    formik.values.socialID = "";
    formik.values.socialType = "";
  };

  const toggleTheme = () => {
    const isDark = darkMode;
    setDarkMode(!isDark);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid container xs={12} item>
            <Grid xs={6} item>
              <Typography component="h1" variant="h6">
                حساب کاربری
              </Typography>
              <BreadCrumb />
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "left", alignSelf: "center" }}>
              <Button
                onClick={toggleTheme}
                color={`${darkMode ? "warning" : "info"}`}
                endIcon={darkMode ? <LightModeIcon /> : <ModeNightIcon />}
              >
                {darkMode ? "روز" : "شب"}
              </Button>
            </Grid>
          </Grid>
          <Box>
            <Item elevation={4}>
              <Toast
                handleToastClose={handleToastClose}
                displayToast={displayToast}
              >
                قبلا این شبکه اجتماعی را انتخاب کرده اید!
              </Toast>
              <Dialog
                displayModal={displayModal}
                handleModalClose={handleModalClose}
                confirmDelete={confirmDelete}
                handleDelete={handleDelete}
                setConfirmDelete={setConfirmDelete}
              />
              <Collapse
                openAccordion={openAccordion}
                handleAccordionClick={handleAccordionClick}
                formik={formik}
                handleAccordionClose={handleAccordionClose}
                editMode={editMode}
              />
              <Box>
                <Item elevation={12} style={{ margin: "34px" }}>
                  <List>
                    {!socialList ? (
                      <ListItem>مسیر ارتباطی وجود ندارد</ListItem>
                    ) : (
                      socialList.map((item) => {
                        return (
                          <ListItem key={item.id}>
                            <Grid container>
                              <Grid item xs={2} sx={{ textAlign: "right" }}>
                                {item.socialType}
                              </Grid>
                              <Grid item xs={3} sx={{ textAlign: "right" }}>
                                آیدی: {item.socialID}
                              </Grid>
                              <Grid item xs={4} sx={{ textAlign: "right" }}>
                                لینک: {item.socialLink}
                              </Grid>
                              <Grid item xs={3} sx={{ textAlign: "left" }}>
                                <Button
                                  color="warning"
                                  variant="text"
                                  onClick={() => handleEdit(item.id)}
                                  endIcon={<EditIcon />}
                                >
                                  ویرایش
                                </Button>
                                <Button
                                  color="error"
                                  variant="text"
                                  onClick={() => handleModalOpen(item.id)}
                                  endIcon={<DeleteIcon />}
                                >
                                  حذف
                                </Button>
                              </Grid>
                            </Grid>
                          </ListItem>
                        );
                      })
                    )}
                  </List>
                </Item>
              </Box>
            </Item>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
