package tech.thuexe.utility;

public class Config {
    public enum ROLE {
        USER("USER"),
        ADMIN("AMIN");
        private String value;
        ROLE(String s) {
            this.value = s;
        }
        public String getValue(){
            return  this.value;
        }
    }
    public enum CONFIG {
        //SECRET((Math.random()*9999)+" This is secret key");
        SECRET(" This is secret key");
        private String value;
        CONFIG(String s) {
            this.value = s;
        }
        public String getValue(){
            return  this.value;
        }
    }
}
