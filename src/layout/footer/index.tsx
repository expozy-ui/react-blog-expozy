// react
import React from "react";
import { useState, useEffect } from "react";
import * as Yup from "yup";
// react query
// formik
import { Form, FormikProvider, useFormik } from "formik";
// next
import Link from "next/link";
import { useRouter } from "next/router";
// api

// notification
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-hot-toast";

import { fetchBlogCategories } from 'lib/dbConnect';
// import { fetchBlogTags } from 'lib/dbConnect';

// material
import {
  Grid,
  Typography,
  Container,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  useTheme,
  InputAdornment,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

// styles
import RootStyled from "./styled";

// logo
import { MainLogo } from "src/components";

// social icons
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import PinterestIcon from "@mui/icons-material/Pinterest";

// config
import config from "src/layout/config.json";

const getSocialIcon = (name: string) => {
  switch (name) {
    case "FaceBook":
      return <FacebookOutlinedIcon />;
    case "Instagram":
      return <InstagramIcon />;
    case "Linkedin":
      return <LinkedInIcon />;
    case "Telegram":
      return <TelegramIcon />;
    default:
      return <PinterestIcon />;
  }
};

export default function Footer() {
  const { footer_links, company, social } = config;
  const theme = useTheme();
  const router = useRouter();
  const [loading, setloading] = React.useState(false);
  const [blogCategories, setBlogCategories] = React.useState<any>(null);
  // const [blogTags, setBlogTags] = React.useState<any>(null);
  const { t } = useTranslation("common");

  const ChangePassWordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required(t("footer.email-required")),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBlogCategories = await fetchBlogCategories();
        setBlogCategories(fetchedBlogCategories);
      } catch (error) {
        console.error('Error fetching fetchBlogCategories:', error);
      }
      // try {
      //   const fetchedBlogTags = await fetchBlogTags();
      //   setBlogTags(fetchedBlogTags);
      // } catch (error) {
      //   console.error('Error fetching fetchBlogTags:', error);
      // }
    }

    fetchData();
  });

  interface BlogCategory {
    id: number;
    title: string;
    slug: string;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values) => {
      setloading(true);
      // mutate(values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <RootStyled>
      <Container>
        <Grid container spacing={3} className="grid-container">
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <MainLogo />
            <Typography variant="body1" color="text.primary" mt={1}>
              {t("footer.address")}
            </Typography>
            <Typography
              component={Link}
              href={`mailto:${company.email}`}
              target="_blank"
              variant="body1"
              color="text.secondary"
              mt={1}
              mb={0.8}
              className="text-link">
              <EmailRoundedIcon fontSize="small" /> {company.email}
            </Typography>
            <Typography
              component={Link}
              href={`tel:${company.phone}`}
              variant="body1"
              color="text.secondary"
              className="text-link">
              <LocalPhoneRoundedIcon fontSize="small" /> {company.phone}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={2}>
              {/* {footer_links.map((v) => (
                <Grid item md={4} xs={4} key={Math.random()}>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    mt={1}
                    mb={2}>
                    {t(v.headline)}
                  </Typography>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      {v.children.map((val) => (
                        <ListItem disablePadding dense key={Math.random()}>
                          <ListItemButton
                            component={Link}
                            href={val.href}
                            className="list-button">
                            <ListItemText primary={t(val.name)} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </nav>
                </Grid>
              ))} */}
              <Grid item md={4} xs={4}>
                <Typography variant="subtitle1" color="text.primary" mt={1} mb={2}>
                  {t("footer.categories")}
                </Typography>

                <nav aria-label="secondary mailbox folders">
                  <List>
                    {blogCategories && blogCategories.slice(0, 4).map((post: BlogCategory, index: number) => (
                      <ListItem disablePadding dense key={index}>
                        <ListItemButton
                          href={`/?category_id=${post.id}`}
                          className="list-button">
                          <ListItemText primary={t(post.title)} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </nav>
              </Grid>
              <Grid item md={4} xs={4}>
                <Typography variant="subtitle1" color="text.primary" mt={1} mb={2}>
                  {t("footer.more")}
                </Typography>

                <nav aria-label="secondary mailbox folders">
                  <List>
                      <ListItem disablePadding dense>
                        <ListItemButton
                          href={`https://expozy.com`}
                          className="list-button">
                          <ListItemText primary="Expozy" />
                        </ListItemButton>
                      </ListItem>
                  </List>
                </nav>
              </Grid>
              <Grid item md={4} xs={4}>
                <Typography variant="subtitle1" color="text.primary" mt={1} mb={2}>
                  {t("footer.follow-us")}
                </Typography>
                <Stack spacing={1} direction="row" className="social-main">
                  {social.map((social) => (
                    <IconButton
                      key={Math.random()}
                      sx={{ color: social.color }}
                      onClick={() => router.push(social.href)}>
                      {getSocialIcon(social.name)}
                    </IconButton>
                  ))}
                </Stack>
              </Grid>
            </Grid>

          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <FormikProvider value={formik}>
              <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Stack className="newsletter-main">
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    mt={1}
                    mb={1.5}>
                    {t("footer.newsletter")}
                  </Typography>
                  <TextField
                    id="newslatter"
                    fullWidth
                    size="small"
                    placeholder={t("footer.enter-email")}
                    variant="outlined"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    className="newsletter-textfield"
                    sx={{
                      ".MuiInputBase-root": {
                        pr: "4px",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LoadingButton
                            loading={loading}
                            size="small"
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                              minWidth: 36,
                              p: "4px",
                            }}>
                            <SendRoundedIcon />
                          </LoadingButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Form>
            </FormikProvider>
          </Grid>
        </Grid>
      </Container>
    </RootStyled>
  );
}
