import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import B2 from './B2'

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

class B extends React.Component {
  state = {
    expanded: 'B2',
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
        <B2
          expanded={expanded === 'B2'}
          handleChange={this.handleChange('B2')}
        />
      </div>
    )
  }
}

B.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(B)
