import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  type User = {
    id : Principal;
    name : Text;
    email : Text;
  };

  module User {
    public func compare(user1 : User, user2 : User) : Order.Order {
      switch (Text.compare(user1.name, user2.name)) {
        case (#equal) { Text.compare(user1.email, user2.email) };
        case (order) { order };
      };
    };
  };

  let users = Map.empty<Principal, User>();

  public shared ({ caller }) func register(name : Text, email : Text) : async () {
    if (users.containsKey(caller)) { Runtime.trap("This user is already registered.") };
    let user : User = {
      id = caller;
      name;
      email;
    };
    users.add(caller, user);
  };

  public query ({ caller }) func isRegistered() : async Bool {
    users.containsKey(caller);
  };

  public query func getUser(userId : Principal) : async User {
    switch (users.get(userId)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) { user };
    };
  };

  public query func getAllUsers() : async [User] {
    users.values().toArray().sort();
  };
};
