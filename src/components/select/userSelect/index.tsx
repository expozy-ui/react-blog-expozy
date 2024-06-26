import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Typography, Divider, Stack, IconButton, Avatar } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import MenuPopover from "src/components/popover/popover";
import { useRouter } from "next/router";
import { PATH_PAGE } from "src/routes/paths";
import { UserList } from "src/components/lists";
import RootStyled from "./styled";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { toast } from "react-hot-toast";
// react-query
// api

import { setLogin } from "src/redux/slices/user";

function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function UserSelect() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector(({ user }: { user: any }) => user);
  const isAuthPath = getKeyByValue(PATH_PAGE.auth, router.pathname);
  const isHomePath = router.pathname === "/";
  const { t } = useTranslation("common");

  const anchorRef = React.useRef(null);
  const [openUser, setOpen] = React.useState(false);
  const [initialize, setInitialize] = useState(false);

  const handleCloseUser = () => {
    setOpen(false);
  };


  return (
    <RootStyled>
      {!initialize ? (
        <IconButton
          color={"default"}
          onClick={() =>
            router.push(
              `/auth/login${
                isAuthPath || isHomePath ? "" : `?redirect=${router.asPath}`
              }`
            )
          }
        >
          <PersonOutlinedIcon />
        </IconButton>
      ) : (
        <>
          <MenuPopover
            open={openUser}
            onClose={handleCloseUser}
            anchorEl={anchorRef.current}
            sx={{
              width: 300,
            }}
          >
            <UserList
              openUser={openUser}
              user={user}
              setOpen={() => setOpen(false)}
              t={t}
            />
          </MenuPopover>
        </>
      )}
    </RootStyled>
  );
}
