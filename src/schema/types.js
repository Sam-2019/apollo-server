const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar DateTime

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
    name: String
  }

  input AddChild {
    firstName: String
    lastName: String
  }

  type CountGender {
    type: String
    value: Int
  }

  type CountVehicle {
    sundayService: ID
    type: String
    date: String
    value: Int
    group: String
  }

  type Department {
    id: ID
    name: String
  }

  type ProfileImage {
    id: ID
    imageURL: String
  }

  input AddImage {
    imageURL: String
    type: String
  }

  type Member {
    id: ID
    firstName: String
    lastName: String
    otherName: String
    imageURL: String
    dateOfBirth: String
    chapel: String
    age: Int
    gender: String
    hometown: String
    location: String
    region: String
    country: String
    residentialAddress: String
    contact: String
    emergencyContact: String
    emailAddress: String
    postalAddress: String
    maritalStatus: String
    spouseName: String
    numberOfChlidren: Int
    nameOfChildren: [String]
    yearJoinedChurch: String
    department: [String]
    previousChurch: String
    group: String
  }

  type MembersFeed {
    members: [Member]
    cursor: String
    hasNextPage: Boolean
  }

  input AddMember {
    firstName: String
    lastName: String
    otherName: String
    dateOfBirth: String
    age: Int
    gender: String
    location: String
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
    numberOfChlidren: Int
    nameOfChildren: [String]
    yearJoinedChurch: String
    department: [String]
    previousChurch: String
    group: String
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
    type: String
  }

  type SundayServiceFeed {
    sundayServices: [SundayService]
    cursor: String
    hasNextPage: Boolean
  }

  input AddSundayService {
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
    type: String
  }

  type Payment {
    members: [ID]
  }

  type PaymentFeed {
    members: [Payment]
    cursor: String
    hasNextPage: Boolean
  }

  type PaymentPayer {
    id: ID
    firstName: String
    lastName: String
    chapel: String
    contact: String
  }

  input AddPayer {
    members: [ID]
    month: String
    type: String
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
    chapel: String
    group: String
  }

  type VisitorFeed {
    visitors: [Visitor]
    cursor: String
    hasNextPage: Boolean
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
    group: String
  }

  type Pledge {
    id: ID
    firstName: String
    lastName: String
    otherName: String
    contact: String
    emailAddress: String
    programme: String
    amount: Int
    pledgeDate: String
    redeemedDate: String
    status: PledgeStatus
  }

  type PledgeFeed {
    pledges: [Pledge]
    cursor: String
    hasNextPage: Boolean
  }

  input AddPledge {
    firstName: String
    lastName: String
    otherName: String
    contact: String
    emailAddress: String
    programme: String
    redeemedDate: String
    pledgeDate: String
    amount: Int
    status: String
  }

  type Vehicles {
    sundayService: ID
    cars: Int
    motors: Int
    bicycles: Int
  }

  type VehiclesFeed {
    vehicles: [Vehicles]
    cursor: String
    hasNextPage: Boolean
  }

  input AddVehicles {
    cars: Int
    motors: Int
    bicycles: Int
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    userName: String
    gender: String
    contact: String
    emailAddress: String
    homeAddress: String
    password: String
    verified: Boolean
    dob: String
    imageURL: String
  }

  type UsersFeed {
    users: [User]
    cursor: String
    hasNextPage: Boolean
  }

  input AddUser {
    firstName: String
    lastName: String
    userName: String
    gender: String
    contact: String
    emailAddress: String
    homeAddress: String
    password: String
    verified: Boolean
    dob: String
  }

  type JWT {
    accessToken: String
    refreshToken: String
  }

  input AddJob {
    title: String
    description: String
    domain: String
    imgURL: String
    favicon: String
    url: String
  }

  type Job {
    id: ID
    title: String
    description: String
    domain: String
    imgURL: String
    favicon: String
    url: String
    created_at: DateTime
    updatedAt: DateTime
  }

  type JobsFeed {
    jobs: [Job]
    cursor: String
    hasNextPage: Boolean
  }

  type Query {
    members: [Member]
    membersFeed(cursor: String): [MembersFeed]
    member(id: ID): Member
    memberByName(firstName: String, lastName: String): Member

    pledges: [Pledge]
    pledge(id: ID): Pledge
    pledgeFeed(cursor: String): [PledgeFeed]

    visitors: [Visitor]
    visitorsFeed(cursor: String): [VisitorFeed]
    visitorsFollowup: [Visitor]
    visitor(id: ID): Visitor

    sundayService: [SundayService]
    sundayServiceFeed(cursor: String): [SundayServiceFeed]

    tithe: [Payment]
    titheFeed(cursor: String): [PaymentFeed]

    welfare: [Payment]
    welfareFeed(cursor: String): [PaymentFeed]

    projectOffering: [Payment]
    projectOfferingFeed(cursor: String): [PaymentFeed]

    pvv: [Payment]
    pvvFeed(cursor: String): [PaymentFeed]

    mmv: [Payment]
    mmvFeed(cursor: String): [PaymentFeed]

    vehicles: [Vehicles]
    vehiclesFeed(cursor: String): [VehiclesFeed]

    users: [User]
    usersFeed(cursor: String): [UsersFeed]
    user: User
    login(emailAddress: String, password: String): JWT
    logout: JWT

    chapel(chapel: String): [Member]
    department(department: String): [Member]

    payment(month: String, type: String): [PaymentPayer]
    countGender(group: String): [CountGender]

    groupStat(type: String): [CountVehicle]
    sundayStat(type: String, vehicles: Boolean): [CountVehicle]

    groupImage(type: String, group: String): [Member]

    jobs: [Job]
    jobsFeed(cursor: String): [JobsFeed]
    job(id: ID): Job
    jobbyTitle(title: String): Job
  }

  type Mutation {
    addMember(input: AddMember): Member
    deleteMember(id: ID): Member
    updateMember(id: ID, input: AddMember): Member

    uploadImage(id: ID, input: AddImage): ProfileImage

    addChild(input: AddChild): Payload
    deleteChild(id: ID): Payload
    updateChild(id: ID, input: AddChild): Payload

    addSundayService(input: AddSundayService): SundayService
    deleteSundayService(id: ID): Payload
    updateSundayService(id: ID, input: AddSundayService): Payload

    addPaymentPayer(input: AddPayer): Payment

    addTithe(input: AddPayer): Payment
    addMMV(input: AddPayer): Payment
    addPVV(input: AddPayer): Payment
    addProjectOffering(input: AddPayer): Payment
    addWelfare(input: AddPayer): Payment

    deletePaymentPayer(id: ID): Payload
    updatePaymentPayer(id: ID, input: AddPayer): Payload

    addVisitor(input: AddVisitor): Visitor
    deleteVisitor(id: ID): Payload
    updateVisitor(id: ID, input: AddVisitor): Visitor

    addPledge(input: AddPledge): Pledge
    deletePledge(id: ID): Payload
    updatePledge(id: ID, input: AddPledge): Pledge
    updatePledgeStatus(id: ID, input: AddPledge): Pledge

    addVehicles(input: AddVehicles): Vehicles
    deleteVehicles(id: ID): Payload
    updateVehicles(id: ID, input: AddVehicles): Vehicles

    signup(input: AddUser): JWT
    deleteUser(id: ID): Payload
    updateUser(id: ID, input: AddUser): User
    verifyUser(id: ID): User

    addJob(input: AddJob): Job
    deleteJob(id: ID): Job
    updateJob(id: ID, input: AddJob): Job

    logout: Boolean

  }
`;

module.exports = typeDefs;
