import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Item, SocialTypes } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  openAccordion: boolean;
  editMode: boolean;
  handleAccordionClick: () => void;
  formik: any;
  handleAccordionClose: () => void;
}

export const Collapse: React.FC<Props> = (props) => {
  return (
    <Accordion
      sx={{ background: "transparent", boxShadow: "none" }}
      expanded={props.openAccordion}
      onChange={props.handleAccordionClick}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ display: "inline-block" }}
      >
        <Button
          variant="text"
          color="warning"
          endIcon={props.editMode ? <EditIcon /> : <AddIcon />}
        >
          {props.editMode ? "ویرایش مسیر ارتباطی" : "افزودن مسیر ارتباطی"}
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <Item elevation={12} style={{ margin: "0 20px" }}>
          <form onSubmit={props.formik.handleSubmit}>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="typeLabel">نوع*</InputLabel>
                  <Select
                    labelId="typeLabel"
                    IconComponent={KeyboardArrowDownIcon}
                    margin="none"
                    required
                    label="نوع"
                    id="socialType"
                    name="socialType"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.socialType}
                  >
                    {SocialTypes.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.value}>
                          {item.icon} {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    label="لینک"
                    id="socialLink"
                    name="socialLink"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.socialLink}
                    type="url"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField
                    id="socialId"
                    label="آی دی (ID)"
                    name="socialId"
                    onChange={props.formik.handleChange}
                    value={props.formik.values.socialId}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                container
                // spacing={{ md: 3 }}
                xs={12}
                sx={{ justifyContent: "left", margin: "15px 0px" }}
              >
                <Grid item xs={1}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    onClick={props.handleAccordionClose}
                  >
                    انصراف
                  </Button>
                </Grid>
                <Grid item xs={2} sx={{ marginRight: "10px" }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="warning"
                  >
                    {props.editMode
                      ? "ویرایش مسیر ارتباطی"
                      : "ثبت مسیر ارتباطی"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Item>
      </AccordionDetails>
    </Accordion>
  );
};
