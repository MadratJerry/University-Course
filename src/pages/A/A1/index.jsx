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
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
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

class A1 extends React.Component {
  num = 0
  state = {
    m: [],
    N: 2,
    x: 0,
    y: 0,
  }

  initialMatrix(n, x, y) {
    n = 2 ** n
    let a = new Array(n).fill([]).map(e => new Array(n).fill(0))
    this.setState({
      m: a,
      N: n,
      x,
      y,
    })
  }

  solve(x, y, n) {}

  async componentDidMount() {}

  createMatrix(n) {
    if (n < 2) return <div key={this.num++} />
    return (
      <div key={this.num}>
        {new Array(4).fill(0).map((e, i) => this.createMatrix(n / 2))}
      </div>
    )
  }

  render() {
    this.num = 0
    const { m } = this.state
    const { classes, expanded, handleChange } = this.props

    return (
      <ExpansionPanel
        expanded={expanded === 'A1'}
        onChange={handleChange('A1')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>A1:Tromino 谜题</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            className="box"
            style={{ width: this.state.N * 25, height: this.state.N * 25 }}
          >
            {this.createMatrix(this.state.N)}
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">n</InputLabel>
            <Select
              native
              value={Math.log2(this.state.N)}
              onChange={(e, i) => this.setState({ N: 2 ** e.target.value })}
              input={<Input id="age-native-simple" />}
            >
              {[1, 2, 3, 4, 5].map(e => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </Select>
            <Button raised color="primary" className={classes.button}>
              开始
            </Button>
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(A1)
