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

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  xy() {
    return [this.x, this.y]
  }

  toString() {
    return 'wow'
  }
}

class Line {
  constructor(o, length, angle) {
    this.angle = angle
    this.p1 = o
    this.p2 = new Point(
      o.x + length * Math.cos(angle),
      o.y + length * Math.sin(angle),
    )
  }

  get length() {
    return Math.sqrt(
      (this.p1.x - this.p2.x) ** 2 + (this.p1.y - this.p2.y) ** 2,
    )
  }

  getPoint(n) {
    return new Line(this.p1, this.length * n, this.angle).p2
  }

  toString() {
    console.log('wow')
  }
}

class A2 extends React.Component {
  state = {
    angle: 30,
    length: 200,
  }

  drawLine(ctx, l) {
    ctx.beginPath()
    ctx.moveTo(...l.p1.xy())
    ctx.lineTo(...l.p2.xy())
    ctx.stroke()
  }

  drawTree(ctx, o, length, angle) {
    if (length < 1) {
      console.log(`wow${this.state.length}`)
      return
    }
    let line = new Line(o, length, angle)
    this.drawLine(ctx, line)
    this.drawTree(
      ctx,
      line.getPoint(1 / 3),
      length * 2 / 3,
      angle + Math.PI * (this.state.angle / 180),
    )
    this.drawTree(
      ctx,
      line.getPoint(2 / 3),
      length * 1 / 3,
      angle - Math.PI * (this.state.angle / 180),
    )
  }

  draw(length) {
    let canvas = document.getElementById('canvas')
    canvas.width = length * 2
    canvas.height = length * 2
    let ctx = document.getElementById('canvas').getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.drawTree(ctx, new Point(length, length), length, 0)
  }

  componentDidMount() {
    this.draw(this.state.length)
  }

  render() {
    const { classes, expanded, handleChange } = this.props

    return (
      <ExpansionPanel expanded={expanded} onChange={handleChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>绘制分形树</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <TextField
              label="length"
              value={this.state.length}
              onChange={e => {
                this.setState({ length: e.target.value })
                this.draw(this.state.length)
              }}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Angel"
              value={this.state.angle}
              onChange={e => {
                this.setState({ angle: e.target.value })
                this.draw(this.state.length)
              }}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <canvas id="canvas" />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(A2)
