namespace ToDoWebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ToDoModels",
                c => new
                    {
                        KeyId = c.Int(nullable: false, identity: true),
                        ToDoText = c.String(),
                        Priority = c.Int(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.KeyId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ToDoModels");
        }
    }
}
