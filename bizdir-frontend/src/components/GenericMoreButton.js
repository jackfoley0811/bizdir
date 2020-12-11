import React, {
  useRef,
  useState,
  memo,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MoreIcon from '@material-ui/icons/MoreVert';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EmailIcon from '@material-ui/icons/Email';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {
  CompanyExcel, SicCodeExcel, IndustryListExcel, AccountListExcel, StateListExcel, CityListExcel, CountyListExcel
} from 'src/utils/excel';
import { getContactsFromCompanies } from 'src/utils/company';

const useStyles = makeStyles(() => ({
  menu: {
    width: 256,
    maxWidth: '100%'
  }
}));

function GenericMoreButton(props) {
  const classes = useStyles();
  const moreRef = useRef(null);
  const [contacts, setContacts] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleMenuOpen = () => {
    setOpenMenu(true);
  };
  const downloadButton = () => (
    <MenuItem>
      <ListItemIcon>
        <CloudDownloadIcon />
      </ListItemIcon>
      <ListItemText primary="Download Excel File" />
    </MenuItem>
  );
  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  const {
    emailSend, companies, filename, sic_codes, industries, accounts, states, counties, cities, noClipboard
  } = props;
  useEffect(() => {
    if (companies) {
      setContacts(getContactsFromCompanies(companies));
    }
  }, [companies]);
  return (
    <>
      <Tooltip title="More options">
        <IconButton
          {...props}
          onClick={handleMenuOpen}
          ref={moreRef}
        >
          <MoreIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ className: classes.menu }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary="Import" />
        </MenuItem> */}
        {!noClipboard && contacts
          && (
          <CopyToClipboard text={contacts} onCopy={() => enqueueSnackbar('This Company Data has been stored to Clipboard Successfully', { variant: 'success' })}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Copy" />
            </MenuItem>
          </CopyToClipboard>
          )}
        {sic_codes
          && (
            <SicCodeExcel element={downloadButton()} sic_codes={sic_codes} filename={filename} />
          )}
        {companies
          && (
            <CompanyExcel element={downloadButton()} companies={companies} contacts={contacts} filename={filename} />
          )}
        {industries
          && (
            <IndustryListExcel element={downloadButton()} industries={industries} filename={filename} />
          )}
        {accounts
          && (
            <AccountListExcel element={downloadButton()} accounts={accounts.map((account) => ({ ...account, key: account?.token?.key, created: account?.token?.created }))} filename={filename} />
          )}
        {states
          && (
            <StateListExcel element={downloadButton()} states={states} filename={filename} />
          )}
        {counties
          && (
            <CountyListExcel element={downloadButton()} counties={counties} filename={filename} />
          )}
        {cities
          && (
            <CityListExcel element={downloadButton()} cities={cities} filename={filename} />
          )}
        {emailSend
          && (
          <>
            <MenuItem onClick={() => {
              handleMenuClose();
              props.sendItems();
            }}
            >
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Send Excel File" />
            </MenuItem>
          </>
          )}

        {/* <MenuItem>
          <ListItemIcon>
            <PictureAsPdfIcon />
          </ListItemIcon>
          <ListItemText primary="Export" />
        </MenuItem> */}
        {/* <MenuItem>
          <ListItemIcon>
            <AchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Achive" />
        </MenuItem> */}
      </Menu>
    </>
  );
}

GenericMoreButton.propTypes = {
  className: PropTypes.string,
};

export default memo(GenericMoreButton);
