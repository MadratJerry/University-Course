import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import TextField from 'material-ui/TextField'
import './index.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class B2 extends React.Component {
  state = {
    m: [],
    f: [],
  }

  componentDidMount() {
    this.setState({
      m: [[9], [12, 15], [10, 6, 8], [2, 18, 9, 5], [19, 7, 10, 4, 16]],
      f: [...new Array(5).fill(0).map((e, i) => [...new Array(i + 1).fill(0)])],
      h: [...new Array(5).fill(0).map((e, i) => [...new Array(i + 1).fill(0)])],
    })
  }

  async solve() {
    const { f, m, h } = this.state
    f[m.length - 1] = m[m.length - 1]
    this.setState({ f })
    for (let i = m.length - 2; i >= 0; --i) {
      for (let j = 0; j <= i; ++j) {
        h.forEach(e => e.fill(0))
        h[i + 1][j] = h[i + 1][j + 1] = 1
        this.setState({ h })
        f[i][j] = Math.max(f[i + 1][j], f[i + 1][j + 1]) + m[i][j]
        await new Promise((solve, reject) => setTimeout(() => solve(), 500))
        this.setState({ f })
      }
    }
    h.forEach(e => e.fill(0))
    for (let i = 0, l = 0, r = 0; i < m.length; i++) {
      h[i][l] = 2
      if (f[i][l] > f[i][r]) r = l++ + 2
      else r = l + 1
      await new Promise((solve, reject) => setTimeout(() => solve(), 500))
      this.setState({ h })
    }
  }

  render() {
    const { classes, expanded, handleChange } = this.props

    return (
      <ExpansionPanel expanded={expanded} onChange={handleChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>最大总和问题</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="tree">
            {this.state.m.map((e, i) => (
              <div className="line" key={i}>
                {e.map((e, j) => (
                  <div
                    className={`box ${
                      [null, 'choose', 'path'][this.state.h[i][j]]
                    }`}
                    key={j}
                  >
                    {e}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            {this.state.f.map((e, i) => (
              <div className="line" key={i}>
                {e.map((e, j) => (
                  <div
                    className={`box ${
                      [null, 'choose', 'path'][this.state.h[i][j]]
                    }`}
                    key={j}
                  >
                    {e}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Button
            raised
            color="primary"
            onClick={() => {
              this.solve()
            }}
          >
            开始
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(B2)
