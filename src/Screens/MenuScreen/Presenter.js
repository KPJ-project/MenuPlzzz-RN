import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";
import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import Dialog, {
  DialogContent,
  SlideAnimation
} from "react-native-popup-dialog";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const ChildTab = props => {
  const _likeClick = props.func;
  const _detailClick = props.funcDetail;
  const myLikes = props.myLikes;
  const slideDetailDialog = props.slideDetailDialog;

  const menuListItem = props.menu.map((ele, index) => (
    <MenuItem
      key={index}
      id={ele.id}
      image={ele.image}
      name={ele.name}
      price={ele.price}
      _likeClick={_likeClick}
      _detailClick={_detailClick}
      slideDetailDialog={slideDetailDialog}
      myLikes={myLikes}
    />
  ));

  return (
    <Container>
      <Content>
        <List>{menuListItem}</List>
      </Content>
    </Container>
  );
};

const MenuItem = props => {
  return (
    <View>
      <ListItem style={styles.container}>
        <Left style={styles.left1}>
          <TouchableOpacity
            onPress={() =>
              props._likeClick(props.id, props.image, props.name, props.price)
            }
          >
            <View>
              {/* <SvgUri source={props.myLikes[props.id] ? fillHeart : emptyHeart} /> */}
              <Image
                source={
                  props.myLikes[props.id]
                    ? require("../../assets/images/fill_heart.png")
                    : require("../../assets/images/empty_heart.png")
                }
              />
            </View>
          </TouchableOpacity>
        </Left>

        <Left style={styles.left2}>
          <ImageLoad
            // style={{
            //   width: "100%",
            //   height: 100,
            //   resizeMode: "contain"
            // }}
            style={{
              width: "100%",
              height: deviceWidth * 0.12,
              resizeMode: "contain"
            }}
            loadingStyle={{ size: "large", color: "black" }}
            source={{
              uri: props.image
            }}
          />
        </Left>

        <Body style={styles.body}>
          <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
          <Text note numberOfLines={1}>
            {props.price}
          </Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => props._detailClick(true)}>
            <View>
              {/* <SvgUri source={detailArrow} /> */}
              <Image source={require("../../assets/images/detail_arrow.png")} />
            </View>
          </TouchableOpacity>
        </Right>
      </ListItem>

      <Dialog
        onDismiss={() => {}}
        onTouchOutside={() => {}}
        onHardwareBackPress={() => {}}
        visible={props.slideDetailDialog}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        <DialogContent>
          <Image
            source={
              {
                // uri: props.image
              }
            }
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "right",
                marginTop: 15,
                fontWeight: "bold"
              }}
            >
              {props.name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "left",
                marginTop: 15
              }}
            >
              는 어떠세요?
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({ slideAnimationDialog: false }, () =>
                Actions.push("webscreen", { _siteUrl: datas[0].siteUrl })
              );
            }}
            style={styles.recommendButtonStyle}
          >
            <Text style={styles.randomTextStyle}>자세히 보기</Text>
          </TouchableOpacity>
        </DialogContent>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight * 0.09,
    marginLeft: 0
  },

  left1: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center"
  },

  left2: {
    flex: 17,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 62,
    flexDirection: "column",
    marginLeft: 10
  },
  right: {
    flex: 8,
    marginRight: 15
  },
  placeHolderStyle: {
    width: "100%",
    height: 100,
    resizeMode: "contain"
  },
  randomTextStyle: {
    fontFamily: "PlayfairDisplay-Black",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#ffffff"
  },
  randomButtonStyle: {
    backgroundColor: "#444444",
    flex: 0.12,
    justifyContent: "center",
    alignItems: "center"
  },
  recommendButtonStyle: {
    backgroundColor: "#ff774f",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginRight: 30,
    marginLeft: 30
  }
});

ChildTab.propTypes = {
  menu: PropTypes.array
};

MenuItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string
};

export default ChildTab;
