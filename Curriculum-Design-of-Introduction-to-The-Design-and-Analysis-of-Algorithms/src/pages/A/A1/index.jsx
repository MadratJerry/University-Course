import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import './index.css'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

class A1 extends React.Component {
  pre = 3

  state = {
    m: [0, 0, 0, 1],
    b: [0],
    N: 2,
  }

  n = 0

  async solve(l, r) {
    const { b, m, N } = this.state
    b.fill(0)[this.n++] = 1
    this.setState({ b })
    let unit = (r - l + 1) / 4,
      s
    for (s = 0; s < 4; s++)
      if (m.slice(l + unit * s, l + unit * (s + 1)).filter(e => e).length) break
    new Array(0, 1, 2, 3)
      .filter(e => e != s)
      .forEach(e => (m[l + e * unit + (3 - e) * (unit - 1) / 3] = 1))
    this.setState({ m })
    if (unit == 1) return
    for (let i = 0; i < 4; i++) {
      await new Promise((solve, reject) => setTimeout(() => solve(), 500))
      await this.solve(l + unit * i, l + unit * (i + 1) - 1)
    }
  }

  createMatrix(l, r) {
    const { m, b } = this.state
    let unit = (r - l + 1) / 4

    if (l == r)
      return (
        <div
          key={l}
          className={m[l] ? 'cover' : ''}
          onClick={() => {
            m[this.pre] = 0
            m[l] = !m[l]
            this.pre = l
            this.setState({ m })
          }}
        >
          <span style={{ color: 'red', fontSize: 8 }}>{l}</span>
        </div>
      )
    return (
      <div
        key={l}
        id={this.num++}
        style={{ border: b[this.num - 1] ? '2px solid red' : null }}
      >
        {new Array(4).fill(0).map((e, i) => {
          return this.createMatrix(l + unit * i, l + unit * (i + 1) - 1)
        })}
      </div>
    )
  }

  render() {
    this.num = 0
    const { m } = this.state
    const { classes, expanded, handleChange } = this.props

    return (
      <ExpansionPanel expanded={expanded} onChange={handleChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Tromino 谜题</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            className="matrix"
            style={{ width: this.state.N * 25, height: this.state.N * 25 }}
          >
            {this.createMatrix(0, this.state.N ** 2 - 1)}
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">n</InputLabel>
            <Select
              value={Math.log2(this.state.N)}
              onChange={(e, i) =>
                this.setState({ N: 2 ** e.target.value }, () => {
                  this.pre = this.state.N ** 2 - 1
                  this.setState({
                    m: new Array(this.state.N ** 2 - 1).fill(0).concat([1]),
                    b: new Array(
                      (n => {
                        let sum = 0
                        for (let i = 0; i < n * 2; i += 2) sum += 2 ** i
                        return sum
                      })(Math.log2(this.state.N)),
                    ).fill(0),
                  })
                })
              }
              input={<Input id="age-native-simple" />}
            >
              {[1, 2, 3, 4, 5].map(e => (
                <MenuItem value={e} key={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
            <Button
              raised
              color="primary"
              className={classes.button}
              onClick={() => {
                this.n = 0
                this.solve(0, this.state.N ** 2 - 1).then(() => {})
              }}
            >
              开始
            </Button>
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles()(A1)
