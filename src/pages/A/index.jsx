import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import A1 from './A1'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
})

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: 'A1',
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  render() {
    const { classes } = this.props
    const { expanded } = this.state

    return (
      <div className={classes.root}>
        <A1 expanded={expanded} handleChange={this.handleChange} />
      </div>
    )
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ControlledExpansionPanels)
