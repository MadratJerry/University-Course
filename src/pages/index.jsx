import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import A from './A'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
})

class IndexPage extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          color="default"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="A类" />
            <Tab label="B类" />
            <Tab label="C类" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <A />
          </TabContainer>
          <TabContainer dir={theme.direction}>B</TabContainer>
          <TabContainer dir={theme.direction}>C</TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(IndexPage)
