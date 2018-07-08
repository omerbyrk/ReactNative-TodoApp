import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SectionList,
  Alert
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sectionListData: [{title: "title", data: ["mehmet"]}], text: '' };
  }

  AddItem() {
    try {
      var title = this.state.text.split(",")[0].trim();
      var data = this.state.text.split(",")[1].trim();
      if (!this.exist(title)) {
        this.createSection(title)
      }
      const section = this.getSection(title);
      section.data.push(data);
      this.setState({sectionListData: this.state.sectionListData, text: ''});
    } catch(e) {
      Alert.alert("Hata!", "Lütfen ilgili iş ve kategoriyi ',' ile ayırınız.!");
    }
    
  }

  deleteItem(title, data) {
    if(this.exist(title)) {
      const item = this.getSection(title);
      (item.data.length > 1) && item.data.splice(item.data.indexOf(data), 1) || this.deleteSection(title);
      this.setState({sectionListData: this.state.sectionListData});
    }
  }

  deleteSection(title) {
    const newSectionListData = this.state.sectionListData.splice(this.state.sectionListData.findIndex((section) => section.title === title), 1);
    this.setState({sectionListData: newSectionListData});
  }

  getRelevantSections() {
    if(this.state.text.indexOf(",") == -1) {
      return this.state.sectionListData.map(item => item.title).filter(title => this.state.text != '' && title.startsWith(this.state.text)).slice(0, 4).map(title => {
        return (
          <View key={title} style={{backgroundColor: '#FCF3CF', borderRadius: 10, padding: 4, marginLeft: 10, marginVertical: 10}} >
            <Text style={{textAlign: "left", fontSize: 18}} onPress= {() => this.setState({text: `${title},`})} > {title} </Text>
          </View>
        )
      });
    }
  }

  createSection(title) {
    this.state.sectionListData.push({ title: title, data: [] });
  }

  getSection(title) {
    return this.state.sectionListData.find(item => item.title == title);
  }

  exist(title) {
    return this.state.sectionListData.find(item => item.title == title) != null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", paddingVertical: 13, backgroundColor: '#2ECC71', borderColor: '#28B463', borderBottomWidth: 1 }}>
          <Text style={{fontSize: 25}}> To Do App </Text>
        </View>
        <View style={{paddingTop: 10, backgroundColor: '#FCF3CF', flex: 1}}>
          <SectionList
            sections={this.state.sectionListData}
            renderItem={({ section, item }) => <View style= {{flexDirection: "row"}} ><Text style={styles.item}>{item}</Text><View style= {{ alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "flex-end" }} ><Text  style= {{marginRight: 20, fontSize: 18, fontWeight: "bold"}} onPress= {() =>  this.deleteItem(section.title, item)} >x</Text></View></View>}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item, index) => index}
          />
          
        </View>
        <View style={{ position: "absolute", backgroundColor: '#F9E79F', bottom: 0, width: "100%", paddingTop: 50,
        flexDirection: "row", borderTopColor: '#F4D03F', borderTopWidth: 1 }}> 
          <View style= {{ position: "absolute", top: 0, flexDirection: "row" }}>
            { this.getRelevantSections() }            
          </View>
          <View style={{ flex: 4 }}>
              <TextInput placeholder=">Note" style={{paddingTop: 5, height: 50, fontSize: 18}} value= {this.state.text} onChangeText = {(value) => this.setState({text: value})} />
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems:"center" }}>
          <Button title="Add" onPress= {() => this.AddItem()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    padding: 5,
    fontSize: 22,
  }
});
