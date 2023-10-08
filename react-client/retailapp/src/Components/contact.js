import React from "react";

class Contact extends React.Component {
    render(){
        return (
            <div>
                <h1>Contact</h1>
                <h2>User Details Form</h2>

                <form action="submit" method="POST">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required/><br/><br/>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required/><br/><br/>

                    <label for="age">Age:</label>
                    <input type="number" id="age" name="age" required/><br/><br/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
           
        );        
    }
}
export default Contact;