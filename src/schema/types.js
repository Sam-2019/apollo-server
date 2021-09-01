const { gql } = require("apollo-server");

const typeDefs = gql`
  enum PledgeStatus {
    PENDING
    REDEEMED
  }

  type SuccessType {
    message: String
  }

  type ErrorType {
    message: String
  }

  type Payload {
    error: ErrorType
  }

  type Child {
    id: ID
    firstName: String
    lastName: String
  }

  type Department {
    id: ID
    name: String
  }

  type Member {
    id: ID
    firstName: String
    lastName: String
    otherName: String
    dateOfBirth: String
    age: String
    gender: String
    hometown: String
    region: String
    country: String
    residentialAddress: String
    contact: String
    emergencyContact: String
    emailAddress: String
    postalAddress: String
    maritalStatus: String
    spouseName: String
    numberOfChlidren: String
    nameOfChildren: [Child]
    dateJoinedChurch: String
    department: [Department]
    previousChurch: String
  }

  input AddMember {
    firstName: String
    lastName: String
    otherName: String
    dateOfBirth: String
    age: String
    gender: String
    hometown: String
    region: String
    country: String
    residentialAddress: String
    contact: String
    emergencyContact: String
    emailAddress: String
    postalAddress: String
    maritalStatus: String
    spouseName: String
    numberOfChlidren: String
    nameOfChildren: [String]
    dateJoinedChurch: String
    department: [String]
    previousChurch: String
  }

  type SundayService {
    id: ID
    adultFemale: Int
    adultMale: Int
    altercallFemale: Int
    altercallMen: Int
    bibleText: String
    bicycles: Int
    cars: Int
    childrenBoy: Int
    childrenGirl: Int
    date: String
    motors: Int
    omegaFemale: Int
    omegaMale: Int
    preacher: String
    theme: String
    startTime: String
    endTime: String
    visitorsFemale: Int
    visitorsMale: Int
  }

  input AddSundayService {
    id: ID
    adultFemale: Int
    adultMale: Int
    altercallFemale: Int
    altercallMen: Int
    bibleText: String
    bicycles: Int
    cars: Int
    childrenBoy: Int
    childrenGirl: Int
    date: String
    motors: Int
    omegaFemale: Int
    omegaMale: Int
    preacher: String
    theme: String
    startTime: String
    endTime: String
    visitorsFemale: Int
    visitorsMale: Int
  }

  type Tithe {
    members: [ID]
  }

  input AddTithePayer {
    member: ID
  }

  type Visitor {
    id: ID
    firstName: String
    lastName: String
    ageGroup: String
    awarenessChannel: String
    awarenessChannelOther: String
    contact: String
    date: String
    invitedBy: String
    knowingChrist: String
    location: String
    membership: String
    monthOfBirth: String
  }

  input AddVisitor {
    firstName: String
    lastName: String
    ageGroup: String
    awarenessChannel: String
    awarenessChannelOther: String
    contact: String
    date: String
    invitedBy: String
    knowingChrist: String
    location: String
    membership: String
    monthOfBirth: String
  }

  type Pledge {
    id: ID
    pledgeeID: ID
    amount: String
    programme: String
    status: PledgeStatus
    pledgeDate: String
    redeemedDate: String
  }

  input AddPledge {
    pledgeID: ID
    amount: String
    programme: String
    status: PledgeStatus
    pledgeDate: String
    redeemedDate: String
  }

  type Query {
    members: [Member]
    member(id: ID): Member
    pledge: [Pledge]
    visitors: [Visitor]
    visitor(id: ID): Visitor
    tithe: [Tithe]
  }

  type Mutation {
    addMember(input: AddMember): Payload
    addSundayService(input: AddSundayService): Payload
    AddTithePayer(input: AddTithePayer): Payload
    addVisitor(input: AddVisitor): Payload
    addPledge(input: AddPledge): Payload
  }
`;

module.exports = typeDefs;
