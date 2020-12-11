import React from 'react';
import useSettings from 'src/hooks/useSettings';
import { THEMES } from 'src/constants';

function Logo(props) {
  const { settings, saveSettings } = useSettings();

  return (
    <img
      alt="Logo"
      src={settings.theme === THEMES.LIGHT ? "/static/logo1.png" : "/static/logo2.png"}
      height="50px"
      {...props}
    />
  );
}

export default Logo;
