import React, {Component, useState} from 'react';
import styles from './styles.css';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input} from 'reactstrap';
import {Card} from 'react-bootstrap';
import axios from 'axios';

export default class Book extends React.Component {

     constructor(props){
        super(props);
        this.state = {
        books: [{name:'Harry Potter',
        price:'35.5 CAD',
        categories:'Fiction',
        des:'A book for reading'}],
        newBook: false,
        editBookToggle: false,
        newData:{
            name:'',
            price:'',
            categories:'',
            des:''
        },
        editData:{
            name:'',
            price:'',
            categories:'',
            des:''
        }
        }
        this.addNew = this.addNew.bind(this);
        this.confirmAdded = this.confirmAdded.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.editBook = this.editBook.bind(this);
        this.update = this.update.bind(this);

    }
    
    // apilink = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDqQ6hADLtNqQ9kzAxsxxR7hwld1ankTs0';
    
    // componentWillMount = () => {
    //     axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyDqQ6hADLtNqQ9kzAxsxxR7hwld1ankTs0').then((response) =>{
    //         this.setState({
    //             books:response.data.items
    //         })
    //     });
    // }

    addNew() {
        this.setState({
            newBook:!this.state.newBook//for toggle
        })
        
    }

    toggleEdit() {
        this.setState({
            editBookToggle: !this.state.editBookToggle//for edit toggle
        })
    }



    //confirm add new book
    confirmAdded() {
        let {books} = this.state;
        books.push({
            name:this.state.newData.name,
            price:this.state.newData.price,
            categories:this.state.newData.categories,
            des:this.state.newData.des
        })
        this.setState({books, newBook:false, newData:{
            name:'',
            price:'',
            categories:'',
            des:''
        }})
        console.log('added');
         console.log('the current data is: ', this.state.books);
    }

    //delete book button
    deleteBook(e){
        let {books} = this.state;
        books.splice(e, 1);
        this.setState({
            books
        })

        console.log('delete book.');
        console.log('the delete current is: ', books);

    }


    //edit book button
    editBook(name,price,categories,des){   
        // let {editData} = this.state;
        // editData.push({
        //     name:this.state.editData.name,
        //     price:this.state.editData.price,
        //     categories:this.state.editData.categories,
        //     des:this.state.editData.des
        // });
        this.setState({editData : {name,price,categories,des },editBookToggle:true});
        console.log('edit book button');

    }

    update(e){
        // let{name, price, categories, des} = this.state.editData;
        let{books} = this.state;
        console.log('the prev edit Data is: ',this.state.editData );
        books[0].name  = this.state.editData.name;
        books[0].price  = this.state.editData.price;
        books[0].categories = this.state.editData.categories;
        books[0].des = this.state.editData.des;
        console.log('after books is: ',books);
        this.setState({
            books,
            editBookToggle:false,
            editData: {
                name:'',
                price:'',
                categories:'',
                des:''
            }
        })
        console.log('books',this.state.books);
        console.log('confirm Update!!');
    }

    render(){
        let books = this.state.books.map((i) =>{
            return (

            <tr key={i.id}>
                <td >{i.name}</td>
                <td>{i.price} </td>
                <td>{i.categories}</td>
                <td>{i.des}</td>
                <td>
                    <Button color = "primary" size="sm" className = "mr-2" active onClick = {this.editBook}>Edit</Button>
                    
                    <Button color = "danger" size = "sm" active onClick={this.deleteBook}>Delete</Button>
                </td>
            </tr>
            )
        });

        return(
            <div className={styles.text}>
            <Table>
            <Button color="primary" onClick={this.addNew}>Add A New Book</Button>
            <Modal isOpen={this.state.newBook} toggle={this.addNew} >
                <ModalHeader toggle={this.addNew}>Modal title</ModalHeader>
                <ModalBody>
                <Form >
                    <FormGroup>
                        <Label for="name">Book Name</Label>
                        <Input id="name"  placeholder="Please type Book Name" value={this.state.newData.name} onChange={(e) => {
                            let {newData} = this.state;
                            newData.name = e.target.value;
                            this.setState({newData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input id="price"  placeholder="Please type Price in CAD" value={this.state.newData.price} onChange={(e) => {
                            let {newData} = this.state;
                            newData.price = e.target.value;
                            this.setState({newData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="categories">category</Label>
                        <Input  id="categories"  placeholder="Please type Category" value={this.state.newData.categories} onChange={(e) => {
                            let {newData} = this.state;
                            newData.categories = e.target.value;
                            this.setState({newData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="des">Description</Label>
                        <Input id="des"  placeholder="Please type Description" value={this.state.newData.des}  onChange={(e) => {
                            let {newData} = this.state;
                            newData.des = e.target.value;
                            this.setState({newData});
                        }}/>
                    </FormGroup>
                </Form>

                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.confirmAdded}>Confirm Added</Button>
                <Button color="secondary" onClick={this.addNew} >Cancel</Button>
                </ModalFooter>
            </Modal>


            <Modal  isOpen={this.state.editBookToggle} toggle={this.toggleEdit} >
                <ModalHeader toggle={this.toggleEdit}>Modal title</ModalHeader>
                <ModalBody>
                <Form >
                    <FormGroup>
                        <Label for="name">Book Name</Label>
                        <Input id="name"  placeholder="Please update title name" value={this.state.editData.name} onChange={(e) => {
                            let {editData} = this.state;
                            editData.name = e.target.value;
                            this.setState({editData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input id="price"  placeholder="Please type Price in CAD" value={this.state.editData.price} onChange={(e) => {
                            let {editData} = this.state;
                            editData.price = e.target.value;
                            this.setState({editData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="categories">category</Label>
                        <Input  id="categories"  placeholder="Please type Category" value={this.state.editData.categories} onChange={(e) => {
                            let {editData} = this.state;
                            editData.categories = e.target.value;
                            this.setState({editData});
                        }}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="des">Description</Label>
                        <Input id="des"  placeholder="Please type Description" value={this.state.editData.des}  onChange={(e) => {
                            let {editData} = this.state;
                            editData.des = e.target.value;
                            this.setState({editData});
                        }}/>
                    </FormGroup>
                </Form>

                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.update}>Updated</Button>
                <Button color="secondary" onClick={this.toggleEdit} >Cancel</Button>
                </ModalFooter>
            </Modal>
            

            <tbody>
                
              {books}
              

            </tbody>
            </Table>
            </div>
        );
    
}
}

