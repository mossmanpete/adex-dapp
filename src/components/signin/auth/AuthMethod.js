import React, { Component } from 'react'
import Translate from 'components/translate/Translate'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import AuthMetamask from 'components/signin/auth/AuthMetamask'
import AuthTrezor from 'components/signin/auth/AuthTrezor'
import AuthLedger from 'components/signin/auth/AuthLedger'
import AuthDemo from 'components/signin/auth/AuthDemo'
import METAMASK_DL_IMG from 'resources/download-metamask.png'
import LEDGER_DL_IMG from 'resources/ledger_logo_header.png'
import TREZOR_DL_IMG from 'resources/trezor-logo-h.png'
import DEMO_IMG from 'resources/demo-logo.png'
import Img from 'components/common/img/Img'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './styles'

class AuthMethod extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
      closeDialog: false,
      bids: []
    }
  }

  handleTabChange = (event, index) => {
    this.setState({ tabIndex: index })
  }

  render() {
    const { t, classes } = this.props
    const { tabIndex } = this.state
    return (
      <Dialog
        open={true}
        classes={{ paper: classes.dialogPaper }}
        BackdropProps={{
          classes: {
            root: classes.backdrop
          }
        }}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle >
          {t('CHOOSE_AUTH_METHOD')}
        </DialogTitle>
        <DialogContent
          classes={{ root: classes.content }}
        >
          <AppBar
            position='static'
            color='default'
          >
            <Tabs
              value={this.state.tabIndex}
              onChange={this.handleTabChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
              textColor='inhprimaryerit'
            >
              <Tab
                // label={t('METAMASK')}
                classes={{ label: classes.tabLabel }}
                label={<Img src={METAMASK_DL_IMG} alt={'Authenticate with METAMASK'} className={classes.tabLogo} />}
              />
              <Tab
                // label={t('TREZOR')}
                classes={{ label: classes.tabLabel }}
                label={<Img src={TREZOR_DL_IMG} alt={'Authenticate with TREZOR'} className={classes.tabLogo} />}
              />
              <Tab
                // label={t('LEDGER')}
                classes={{ label: classes.tabLabel }}
                label={<Img src={LEDGER_DL_IMG} alt={'Authenticate with LEDGER'} className={classes.tabLogo} />}
              />
              <Tab
                label={<div className={classes.tabLabel}> <Img src={DEMO_IMG} alt={'Demo mode'} className={classes.tabLogo} /> <span>{t('DEMO_MODE')}</span></div>}
                classes={{ label: classes.tabLabel }}
              />
            </Tabs>
          </AppBar>
          <div className={classes.tabsContainer}>
            {(tabIndex === 0) &&
              <AuthMetamask />
            }
            {(tabIndex === 1) &&
              <AuthTrezor />
            }
            {(tabIndex === 2) &&
              <AuthLedger />
            }
            {(tabIndex === 3) &&
              <AuthDemo />
            }

          </div>
        </DialogContent>

      </Dialog>
    )
  }
}

export default Translate(withStyles(styles)(AuthMethod))
