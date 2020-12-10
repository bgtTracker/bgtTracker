import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Input} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Badge } from 'reactstrap';



export default class ModalWithForm extends React.Component {

    constructor (props) {
        super(props);

        var today = new Date(),
            nowDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()<10 ? '0' + today.getDate(): today.getDate());
        
        
        this.state = {
            type: "category",
            name: "",
            amount: 0,
            category: "",
            color: "#000000",
            date: nowDate,
            note: "",
            className: "",

            buttonLabel: "New row",
            modalLabel: "New row",
            modal: false,
            setModal: false // zbedne
        }
        this.toggle = this.toggle.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeAmount = this.changeAmount.bind(this)
        this.changeDate = this.changeDate.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
        this.changeColor = this.changeColor.bind(this)
        this.changeNote = this.changeNote.bind(this)
        this.setState = this.setState.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggle () {
        this.setState((prevState) => {
            return {
                modal: !this.state.modal
            }
        })
    }
    changeName(event) {
        this.setState({ name: event.target.value })
    }

    changeAmount(event) {
        this.setState({ amount: event.target.value })
    }

    changeDate(event) {
        this.setState({ date: event.target.value })
    }

    changeCategory(event) {
        this.setState({ category: event.target.value })
    }

    changeNote(event) {
        this.setState({ note: event.target.value })
    }

    changeColor(event) {
        this.setState({ color: event.target.value })
    }

    handleSubmit() {
        //console.log("Submit")
        //console.log(this.state)
        this.props.handleNew(this.state)
        this.toggle()
        //this.props.dispatch()
    }


    colorFormat(cell) {
        return (<Badge style={{backgroundColor: cell, color: cell}}>{cell}</Badge>)
    }  

    render() {
        this.state.type = this.props.type
        const selectOpt = this.props.category
        this.state.buttonLabel = this.props.buttonLabel
        const categorySelect = selectOpt.map((cat) => (<option> {cat.name} </option>))
        var formBody = (
            <div>
                <FormGroup>
                    <Label >{this.state.type === "income"? "Income name" : this.state.type === "expense" ? "Expense name" : this.state.type === "bill" ? "Bill name" : "Category name"}</Label>
                    <Input type="text" name="name" id="name" placeholder="Enter text" onChange={this.changeName} value={this.state.name} />
                </FormGroup>
                <FormGroup>
                    <Label >Amount</Label>
                    <Input type="number" name="amount" id="amount" placeholder="Enter amount" onChange={this.changeAmount} value={this.state.value} />
                </FormGroup>
                <Row>
                <Col>
                <FormGroup>
                    <Label>Date</Label>
                    <Input type="date" name="date" id="date" placeholder="Enter date" onChange={this.changeDate} value={this.state.date}/>   
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label >Choose category</Label>
                    <Input type="select" name="category" id="category" onChange={this.changeCategory} value={this.state.category}>
                        {categorySelect}
                    </Input>
                </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                    <Label >Note</Label>
                    <Input type="textarea" name="note" id="note"  onChange={this.changeNote} />
                </FormGroup>
          </div>
        )
        var catBody = (
            <div>
                <Row>
                <Col>
                <FormGroup>
                    <Label >Category name</Label>
                    <Input type="text" name="name" id="name" placeholder="Enter text" onChange={this.changeName} value={this.state.name} />
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label >Category color</Label>
                    <Input type="color" name="color" id="color" placeholder="Choose color" onChange={this.changeColor} value={this.state.color} />
                </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                    <Label >Note</Label>
                    <Input type="textarea" name="note" id="note"  onChange={this.changeNote} />
                </FormGroup>
                
          </div>
        )
        return (
            <div>
                <Button color="success" onClick={this.toggle}>{this.state.buttonLabel}</Button>
                <Modal onSubmit={this.handleSubmit} isOpen={this.state.modal} toggle={this.toggle} className={this.state.className} size="lg" style={{position: "absolute", top: "50px", right: "100px", bottom: 0, left: 0, zIndex: 10040, overflow: "auto", overflowY: "auto"}}>
                    <ModalHeader toggle={this.toggle}>{this.state.type === "income"? "New Income" : this.state.type === "expense" ? "New Expense" : this.state.type === "bill" ? "New Bill " : "New category"}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                        {this.state.type === "category"? catBody: formBody}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" onClick={this.handleSubmit}>Submit</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}