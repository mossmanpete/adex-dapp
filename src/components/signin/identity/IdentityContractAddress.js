import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'actions'
import IdentityHoc from './IdentityHoc'
import Translate from 'components/translate/Translate'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { getIdentityContractAddress } from 'services/idenity/contract-address'

class IdentityContractAddress extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.validate('identityContractAddress', {
            isValid: !!this.props.identity.identityContractAddress,
            err: { msg: 'ERR_NO_IDENTITY_CONTRACT_ADDRESS' },
            dirty: false
        })
    }

    getIdentityContracAddress = (extraEntropy = '') => {
        const addrData = getIdentityContractAddress({ extraEntropy: this.props.identity.extraEntropyIdentityContract })
        this.props.handleChange('identityContractAddress', addrData.addr)
        this.props.validate('identityContractAddress', {
            isValid: !!addrData.addr,
            err: { msg: 'ERR_NO_IDENTITY_CONTRACT_ADDRESS' },
            dirty: true
        })
    }

    render() {
        const { identity, t } = this.props
        const { extraEntropyIdentityContract, identityContractAddress } = identity || {}

        return (
            <div>
                <Grid
                    container
                    spacing={16}
                >
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            type='text'
                            required
                            label={t('extraEntropyIdentityContract', { isProp: true })}
                            value={extraEntropyIdentityContract || ''}
                            onChange={(ev) => this.props.handleChange('extraEntropyIdentityContract', ev.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <Button
                            onClick={this.getIdentityContracAddress}
                        >
                            {'Get addr'}
                        </Button>
                        <div>
                            {identityContractAddress || ''}
                        </div>

                    </Grid>
                </Grid>
            </div >
        )
    }
}

IdentityContractAddress.propTypes = {
    actions: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    let persist = state.persist
    // let memory = state.memory
    return {
        account: persist.account,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const IdentityContractAddressStep = IdentityHoc(IdentityContractAddress)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Translate(IdentityContractAddressStep))