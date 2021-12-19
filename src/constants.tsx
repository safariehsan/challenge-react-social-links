import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

export const Item = styled(Paper)(() => ({
  textAlign: "center",
  padding: "20px",
  lineHeight: "60px",
  borderRadius: "16px",
}));

export const SocialTypes = [
  {
    name: "تویتر",
    value: "twitter",
    icon: <TwitterIcon />,
  },
  {
    name: "فیسبوک",
    value: "facebook",
    icon: <FacebookIcon />,
  },
  {
    name: "اینستاگرام",
    value: "instagram",
    icon: <InstagramIcon />,
  },
  {
    name: "تلگرام",
    value: "telegram",
    icon: <TelegramIcon />,
  },
  {
    name: "وب سایت",
    value: "website",
    icon: <LanguageIcon />,
  },
  {
    name: "لینکداین",
    value: "linkedin",
    icon: <LinkedInIcon />,
  },
];

export const ModalStyles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#333",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};
