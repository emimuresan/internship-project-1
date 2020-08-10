import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function MyProfile() {
  const style = useStyles();

  return (
    <>
      <div className={style.hero}>
        <div className={style.heroContent}>
          <div class={style.heroAvatar}>
            <Avatar
              alt="User"
              src="/static/images/avatar/1.jpg"
              className={style.large}
            />
          </div>
          <h1>Firstname Lastname</h1>
          <h3>ciocirlan.r@mail.com</h3>
        </div>
      </div>
    </>
  );
}
