import React from "react";
import {browserHistory} from "react-router";
import Header from "../components/bank/Header";
import Sidebar from "../components/bank/Sidebar";
import Body from "../components/bank/Body";
import Viewbanks from "../components/bank/Viewbanks";
import style from "../../css/bank.css";
import {startBank, addQuestion, getAllBanks, popListWithQuestion, inViewQuestions, updateQuestion} from "../api/axios";

export default class Banks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ques: '',
      quesId: 0,
      quesarr: [],
      options: [{
        opName: '',
        idx: ''
      }],
      bankId: -1,
      bankName: '',
      optionChecked: 0,
      error: '',
      isBankNameEditting: false,
      onCreate: false,
      inView: false,
      results: undefined,
      inView: false,
      viewBankId: 0,
      resultsForView: [],
      serverQuesId: undefined
    };
  }

  handleQuestionChange = (evt) => {
    this.setState({
      ...this.state,
      ques: evt.target.value
    });
  }

  handleBankNameChange = (evt) => {
    this.setState({
      ...this.state,
      bankName: evt.target.value
    });
  }

  handleOptionNameChange = (idx) => (evt) => {
    const newOptions = this.state.options.map((option, sidx) => {
      if (idx !== sidx) return option;
      return {
        ...option,
        opName: evt.target.value,
        idx: sidx
      };
    });

    this.setState({options: newOptions});
  }

  updateStateAfterSubmit = (quesId, ques, options, optionChecked, serverQuesId, bankId) => {
    let quesarr = this.state.quesarr;
    quesarr[quesId] = ({
      quesId,
      ques,
      options,
      optionChecked,
      serverQuesId
    });

    this.setState({
      ...this.state,
      quesarr,
      ques: '',
      quesId: quesarr.length,
      options: [{
        opName: "",
        idx: 0
      }],
      optionChecked: 0,
      serverQuesId: undefined,
      bankId: bankId ? bankId : this.state.bankId
    });

  };

  handleSubmit = (evt) => {
    let {ques, options, quesId, optionChecked, serverQuesId} = this.state;
    let data = {
      bank_name: this.state.bankName,
      question: this.state.ques,
      option_1: options[0].opName,
      option_2: options[1].opName,
      option_3: options[2].opName,
      option_4: options[3].opName,
      answer: optionChecked
    };
    if (!serverQuesId) {
      if (this.state.bankId === -1) {
        startBank(JSON.stringify(data)).then((response) => {
          console.log(response);

          if (response.data.status === 'success') {
            console.log(response);
            serverQuesId = response.data.data.question_id;
            const bankId = response.data.data.bank_id;
            this.updateStateAfterSubmit(quesId, ques, options, optionChecked, serverQuesId, bankId);

          } else {
            this.setState({
              ...this.state,
              error: response.data.message
            });
          }
        }).catch((error) => {
          console.log(error);
        });

      } else {
        data.bank_id = this.state.bankId;
        addQuestion(JSON.stringify(data), this.state.bankId).then((response) => {
          if (response.data.status === 'success') {
            serverQuesId = response.data.data[0].question_id;
            this.updateStateAfterSubmit(quesId, ques, options, optionChecked, serverQuesId);
          } else {
            this.setState({
              ...this.state,
              error: response.data.message
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    } else {
      console.log("Patch Request");
      updateQuestion(JSON.stringify(data), this.state.bankId, serverQuesId).then((response) => {

        if (response.data.status === 'success') {
          this.updateStateAfterSubmit(quesId, ques, options, optionChecked, serverQuesId);
        } else {
          this.setState({
            ...this.state,
            error: response.data.message
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  handleAddOption = () => {
    const {options, idx} = this.state;
    console.log('add clicked', options);
    this.setState({
      options: this.state.options.concat([{opName: ''}]),
    });
  };

  handleRemoveOption = (idx) => () => {
    console.log("aa gaya", idx);
    this.setState({
      options: this.state.options.filter((s, sidx) => idx !== sidx)
    });
  };

  onOptionCheckedChange = (idx) => {
    this.setState({
      ...this.state,
      optionChecked: idx
    });
  }

  loadQuestion = (index, questionId) => {
    const {quesId, quesarr} = this.state;

    this.setState({
      ...this.state,
      ques: quesarr[index].ques,
      quesId: index,
      options: quesarr[index].options,
      optionChecked: quesarr[index].optionChecked,
      serverQuesId: quesarr[index].serverQuesId
    });
  };

  handleBankNameEditToggle = (isEditting) => {
    this.setState({
      ...this.state,
      isBankNameEditting: isEditting
    });
  }

  onCreateNewButtonClick = (evt) => {
    this.setState({
      ...this.state,
      onCreate: true,
      inView: false,
    });
  }

  onAddNewButtonClick = (evt) => {
    console.log("Add new clicked", this.state.quesarr);
    this.setState({
      ...this.state,
      quesarr: this.state.quesarr,
      ques: '',
      quesId: this.state.quesarr.length,
      options: [{
        opName: "",
        idx: 0
      }],
      optionChecked: 0,
      serverQuesId: undefined
    });
  }

  discardChanges = (evt) => {
    console.log('in discard changes');
    this.setState({
      ...this.state,
      ques: '',
      quesId: 0,
      quesarr: [],
      options: [{
        opName: '',
        idx: ''
      }],
      bankId: 0,
      bankName: '',
      optionChecked: 0,
      error: '',
      isBankNameEditting: false,
      onCreate: false,
      inView: false,
    });

    this.reloadAllBanks();
  }

  reloadAllBanks = () => {
    getAllBanks()
      .then((response) => {
        console.log(response);
        if (response.data.status === 'success') {
          this.setState({
            ...this.state,
            results: response.data.data
          });
        } else {
          console.log("in here");
          this.setState({
            ...this.state,
            results: undefined
          });
        }
      })
      .catch((err) => {
        console.log("in here");
        this.setState({
          ...this.state,
          results: undefined
        });
      });
  }

  componentWillMount() {
    console.log('Banks - component is mounting');
    this.reloadAllBanks();
  }

  handleViewClick = (evt, bankId) => {
    this.setState({
      inView: true,
      viewBankId: bankId,
      bankId: bankId
    });

    inViewQuestions(bankId)
      .then((response) => {
        console.log(response);
        if (response.data.status === 'success') {
          let quesArr = [];
          for (let i = 0; i < response.data.data.length; i++) {
            const quesRow = response.data.data[i];

            let options = [];
            for (let j = 1; j < 5; j++) {
              const optionKeyName = "option_" + j;
              options.push({
                opName: quesRow[optionKeyName],
                idx: j - 1
              });
            }

            quesArr.push({
              quesId: i,
              serverQuesId: quesRow.question_id,
              ques: quesRow.question,
              options,
              optionChecked: quesRow.answer
            });
          }
          this.setState({
            ...this.state,
            resultsForView: response.data.data,
            bankName: response.data.data[0].bank_name,
            quesarr: quesArr,
            quesId: quesArr.length
          });
        } else {
          debugger;
          console.log("in here");
          this.setState({
            ...this.state,
            resultsForView: undefined
          });
        }
      })
      .catch((err) => {
        debugger;
        console.log("in here");
        this.setState({
          ...this.state,
          resultsForView: undefined
        });
      });

  }

  saveBankClick = (evt) => {
    console.log('in save click');
    this.setState({
      ...this.state,
      ques: '',
      quesId: 0,
      quesarr: [],
      options: [{
        opName: '',
        idx: ''
      }],
      bankId: 0,
      bankName: '',
      optionChecked: 0,
      error: '',
      isBankNameEditting: false,
      onCreate: false,
      inView: false,
    });

    this.reloadAllBanks();
  }

  render() {
    return (
      <div>
        {
          (this.state.onCreate || this.state.inView) &&
          <div>
            <Header
              onCreate={this.state.onCreate}
              inView={this.state.inView}
              isBankNameEditting={this.state.isBankNameEditting}
              bankName={this.state.bankName}
              handleBankNameChange={this.handleBankNameChange}
              handleBankNameEditToggle={this.handleBankNameEditToggle}
              discardChanges={this.discardChanges}
              onCreateNewButtonClick={this.onCreateNewButtonClick}
              saveBankClick={this.saveBankClick}
            />

            <div className={style.partition}>
              <div className={style.left}>
                <Sidebar
                  quesarr={this.state.quesarr}
                  resultsForView={this.state.resultsForView}
                  inView={this.state.inView}
                  onCreate={this.state.onCreate}
                  bankId={this.state.bankId}
                  serverQuesId={this.state.serverQuesId}
                  resultsForView={this.state.resultsForView}
                  loadQuestion={this.loadQuestion}
                  onAddNewButtonClick={this.onAddNewButtonClick}
                />
              </div>

              <div className={style.right}>
                <Body
                  bankName={this.state.bankName}
                  quesarr={this.state.quesarr}
                  ques={this.state.ques}
                  options={this.state.options}
                  optionChecked={this.state.optionChecked}
                  error={this.state.error}
                  serverQuesId={this.state.serverQuesId}
                  handleQuestionChange={this.handleQuestionChange}
                  onOptionCheckedChange={this.onOptionCheckedChange}
                  handleOptionNameChange={this.handleOptionNameChange}
                  handleRemoveOption={this.handleRemoveOption}
                  handleAddOption={this.handleAddOption}
                  handleSubmit={this.handleSubmit}
                />
              </div>
            </div>
          </div>
        }
        {
          !(this.state.onCreate || this.state.inView) &&
          <div className={style.bankPage}>
            <Header
              onCreate={this.state.onCreate}
              isBankNameEditting={this.state.isBankNameEditting}
              bankName={this.state.bankName}
              handleBankNameChange={this.handleBankNameChange}
              handleBankNameEditToggle={this.handleBankNameEditToggle}
              onCreateNewButtonClick={this.onCreateNewButtonClick}
            />
            <Viewbanks
              inView={this.state.inView}
              results={this.state.results}
              handleViewClick={this.handleViewClick}
            />

          </div>
        }
      </div>
    );


  }
}