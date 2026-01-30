package com.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Role {
    @Id
    private UUID id = UUID.randomUUID();
    @Column(unique = true,nullable = false )
    private String name;

}
