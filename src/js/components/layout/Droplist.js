import React, { PropTypes } from "react";
import {FormControl, ControlLabel} from "react-bootstrap";
import style from "../../../css/droplist.css";

export default class Droplist extends React.Component {
  constructor(props) {
    super(props);
    const dataList = props.dataList;

    this.state = {
      dataList,
      searchList: dataList,
      value: '',
      isOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const dataList = nextProps.dataList;

    this.state = {
      dataList,
      searchList: dataList,
      value: '',
      isOpen: false
    };
  }

  static PropTypes = {
    dataList: PropTypes.array.isRequired,
    label: PropTypes.string
  }

  search(event) {
    const val = event.target.value;
    const searchList = this.state.dataList.filter((value, index, arr) => {
      return value.name.includes(val);
    });

    this.setState({
      ...this.state,
      value: val,
      searchList,
      isOpen: true
    });
  }

  selected(row) {
    this.setState({
      ...this.state,
      selected: row.id,
      isOpen: false,
      value: row.name
    });

    this.props.whenChanged(row.id);
  }

  toggleOpen() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  }

  render() {

    return (
      <div>

        <FormControl type="text" placeholder={this.props.label !== undefined ? this.props.label : "Search"} value={this.state.value}
                     onChange={(event) => this.search(event)} onClick={() => this.toggleOpen()}/>

        { this.state.isOpen &&
        <div className={style.rowHolder}>
          <div>
            {
              this.state.searchList.map((row, index) => {
                return (
                  <div
                    key={"bank" + index}
                    className={this.state.selected === row.id ? style.row + " " + style.selectedRow : style.row}
                    onClick={() => this.selected(row)}
                  >
                    {row.name}
                  </div>
                );
              })
            }
          </div>
        </div>
        }

      </div>
    );
  }
}
