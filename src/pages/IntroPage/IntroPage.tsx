import React, { ReactElement, useState } from "react";
import AimoTitledInput from "@aimo.ui/aimo-titledinput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { storeUsername } from "src/reducers/userSlice";
import Button from "src/components/Button";
import { InputProps } from "src/types/InputPropsType";

import "./IntroPage.scss";

const IntroPage = (): ReactElement => {
  const [username, setUsername] = useState<InputProps>({ value: "" });
  const [editMode, setEditMode] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (value: string): void => {
    setUsername({ value: value, error: "" });
  };

  const handleInputKeyPress = (event: KeyboardEvent): void => {
    if (event.key === "Enter") handleSetName();
  };

  const handleSetName = (): void => {
    if (editMode) {
      if (!username.value) {
        setUsername({
          value: username.value,
          error: "Please enter your name",
        });
        return;
      }
      setEditMode(false);
    } else {
      performGameStart();
    }
  };

  const performGameStart = (): void => {
    dispatch(storeUsername(username.value));
    navigate("/play");
  };

  return (
    <div className="introPageContainer">
      <div className="introContent">
        <div className="usernameRow">
          <div className="usernameLabel">{editMode ? "Name:" : "Welcome"}</div>
          <div
            className="usernameContainer"
            onClick={() => {
              if (!editMode) {
                setEditMode(true);
              }
            }}
          >
            {editMode ? (
              <AimoTitledInput
                activeStateClassName="usernameInputContainer"
                error={username.error}
                errorClassName="error"
                inactiveStateClassName="usernameInputContainer"
                inputType="text"
                onChange={handleUsernameChange}
                onKeyPress={handleInputKeyPress}
                placeholder=""
                value={username.value}
              />
            ) : (
              <div className="usernameText">{username.value}!</div>
            )}
          </div>
        </div>
        <Button className="introButton" onClick={() => handleSetName()}>
          {editMode ? "Ready!" : "Play!"}
        </Button>
      </div>
    </div>
  );
};

export default IntroPage;
